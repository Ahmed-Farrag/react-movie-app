import { rest } from "msw";
import { setupServer } from "msw/node";

const makeReq = (config) => {
  const handler = config.map((con) => {
    return rest[con.method || "get"](con.url, (req, res, ctx) => {
      console.log("this query" + req.url.searchParams.get("query"));
      return res(ctx.json(con.data));
    });
  });
  const server = setupServer(...handler);
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};

export default makeReq;
