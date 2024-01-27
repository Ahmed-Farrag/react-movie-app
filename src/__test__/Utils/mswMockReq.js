import { rest } from "msw";
import { setupServer } from "msw/node";
import axios from "axios";

const makeReq = async (config) => {
  const handler = config.map((con) => {
    return rest[con.method || "get"](con.url, (req, res, ctx) => {
      console.log("this query" + req.url.searchParams.get("query"));
      // return res(ctx.json(con.data));
      return res(ctx.json(con.response));
    });
  });
  const server = setupServer(...handler);
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default makeReq;

// or
// axios.get.mockResolveOnce({ data: movie });
