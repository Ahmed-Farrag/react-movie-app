import { screen } from "@testing-library/react";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
import PaginationComp from "../Components/Pagination";
import { NavWithList } from "./Utils/MixedComponent";
import userEvent from "@testing-library/user-event";
import makeReq from "./Utils/mswMockReq";
import { baseURL } from "./Utils/ApiLink";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => {
    return 13;
  },
}));

makeReq([
  {
    url: `${baseURL}/search/movie`,
    Response: {
      results: [],
      total_page: 1,
    },
  },
]);

describe("test pagination ui", () => {
  test("ui", async () => {
    renderWithRedux(
      <MemoryRouter>
        <PaginationComp />
      </MemoryRouter>
    );
    const btn = await screen.findAllByRole("button");
    for (let i = 0; i <= btn.length; i++) {
      console.log("btn" + btn[i].innerHTML);
    }
    expect(btn[1].innerHTML).toBe(1);
  });
  //   test when no data found
  test("input txt no data found", async () => {
    renderWithRedux(
      <MemoryRouter>
        <NavWithList />
      </MemoryRouter>
    );
    const input = await screen.findAllByRole("textbox");
    userEvent.type(input[0], "ahmed");
    const btn = screen.queryAllByRole("button");
    expect(btn).toHaveLength(0);
  });
});

describe("test pagination logic", () => {
  test("when click on page number", async () => {
    renderWithRedux(
      <MemoryRouter>
        <PaginationComp />
      </MemoryRouter>
    );
    const btn = await screen.findAllByRole("button");
    await userEvent.click(btn[4]);
    expect(btn[5].getAttribute("aria-current")).toBe("page");
  });
});
