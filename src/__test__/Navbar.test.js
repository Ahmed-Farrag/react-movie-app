import { screen } from "@testing-library/react";
import NavBar from "../Components/NavBar";
import renderWithRedux from "./Utils/testRedux";
import userEvent from "@testing-library/user-event";
import makeReq from "./Utils/mswMockReq";
import { MemoryRouter } from "react-router-dom";
import { baseURL } from "./Utils/ApiLink";
import { NavWithList } from "./Utils/MixedComponent";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => {
    return { id: 0 };
  },
}));
// test navbar ui
describe("test navbar ui", () => {
  // test logo render
  test("logo", async () => {
    renderWithRedux(<NavBar />);
    const logo = await screen.findAllByRole("img");
    expect(logo).toHaveLength(1);
  });
  //   test input search
  test("input search", async () => {
    renderWithRedux(<NavBar />);
    const input = await screen.findAllByRole("textbox");
    expect(input).toHaveLength(1);
  });
});

makeReq([
  {
    url: `${baseURL}/search/movie`,
    Response: {
      results: [
        {
          id: 1,
          title: "test",
          poster_path: "test",
          overview: "test",
          release_data: "test",
          vote_average: 1,
          original_language: "test",
          vote_count: 1,
        },
      ],
      total_page: 1,
    },
  },
]);

// text navbar function
describe("test navbar function", () => {
  // test input typing
  test("input typing", async () => {
    renderWithRedux(<NavBar />);
    const input = await screen.findAllByRole("textbox");
    await userEvent.type(input[0], "test");
    expect(input[0]).toHaveValue("test");
  });

  // test when user make req to api
  test("hj", async () => {
    renderWithRedux(
      <MemoryRouter>
        <NavWithList />
      </MemoryRouter>
    );
    const input = await screen.findAllByRole("textbox ");
    await userEvent.type(input[0], "hew");
    const card = await screen.findAllByTestId("card");
    expect(card).toHaveLength(1);
  });
});
