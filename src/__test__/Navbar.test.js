import { screen } from "@testing-library/react";
import NavBar from "../Components/NavBar";
import { renderWithRedux } from "./Utils/testRedux";
import userEvent from "@testing-library/user-event";

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
  //   text navbar function
  describe("test navbar function", () => {
    test("input typing", async () => {
      renderWithRedux(<NavBar />);
      const input = await screen.findAllByRole("textbox");
      await userEvent.type(input[0], "test");
      expect(input[0]).toHaveValue("test");
    });
  });
});
