import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieList from "../Components/MovieList";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
import { baseURL } from "./Utils/ApiLink";
import makeReq from "./Utils/mswMockReq";
import { NavWithList } from "./Utils/MixedComponent";
import axios from "axios";
import MovieDetails from "../Components/MovieDetails";

const movie = {
  id: 1,
  title: "test",
  poster_path: "test",
  overview: "test",
  release_data: "test",
  vote_average: 1,
  original_language: "test",
  original_title: "test2",
  vote_count: 1,
  homepage: "test",
};

// jest.mock("../Redux/Actions/MoviesAction", () => {
//   return {
//     getMovieDetails: jest.fn(() => {type: "test"}),
//   };
// });

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return { id: 16 };
  },
}));

describe("test logic", () => {
  test("logic", async () => {
    axios.get.mockResolveOnce({ data: movie });
    window.history.pushState({}, "", `/movie/${movie.id}`);
    renderWithRedux(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );
    const img = await screen.findByRole("img");
    expect(window.location.href).toBe(`http://localhost/movie/${movie.id}`);
  });
});

describe("test ui", () => {
  test("ui", async () => {
    axios.get.mockResolveOnce({ data: movie });
    renderWithRedux(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );
    const img = await screen.findByRole("img");

    expect(img.getAttribute("src")).toBe(
      `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
    );
    const title = await screen.findByTestId("title");
    expect(title.innerHTML).toContain(movie?.title);
  });
});
