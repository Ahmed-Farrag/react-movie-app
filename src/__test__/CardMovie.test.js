import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieList from "../Components/MovieList";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
import { baseURL } from "./Utils/ApiLink";
import makeReq from "./Utils/mswMockReq";
import { NavWithList } from "./Utils/MixedComponent";
import CardMovie from "../Components/CardMovie";

const mov = {
  id: 1,
  title: "test",
  poster_path: "test",
  overview: "test",
  release_data: "test",
  vote_average: 1,
  original_language: "test",
  original_title: "test2",
  vote_count: 1,
};

describe("test ui for card", () => {
  test("card ui", async () => {
    renderWithRedux(
      <MemoryRouter>
        <CardMovie mov={mov} />
      </MemoryRouter>
    );
    const img = await screen.findByRole("img");
    expect(img.getAttribute("src")).toBe(
      `https://image.tmdb.org/t/p/w500/${mov.poster_path}`
    );
    const p = await screen.findByRole("paragraph");
    expect(p[0].innerHTML).toBe(`اسم الفيلم: ${mov.title}`);
    expect(p[1].innerHTML).toBe(`تاريخ الاصدار: {mov.release_date}`);
  });
});
