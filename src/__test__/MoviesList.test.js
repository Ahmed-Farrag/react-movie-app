import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieList from "../Components/MovieList";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
import { baseURL } from "./Utils/ApiLink";
import makeReq from "./Utils/mswMockReq";
import { NavWithList } from "./Utils/MixedComponent";

makeReq([
  {
    url: `${baseURL}/movie/popular`,
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
  {
    url: `${baseURL}/search/movie`,
    Response: {
      results: [],
      total_page: 1,
    },
  },
]);

const CardsWrapper = () => {
  return (
    <MemoryRouter>
      <MovieList />
    </MemoryRouter>
  );
};

describe("when first load", () => {
  test("get all movies", async () => {
    renderWithRedux(<CardsWrapper />);
    const card = await screen.findAllByTestId("card");
    expect(card).toHaveLength(2);
  });

  test("input text no data found", async () => {
    renderWithRedux(
      <MemoryRouter>
        <NavWithList />
      </MemoryRouter>
    );
    const input = await screen.findAllByRole("textbox");
    userEvent.type(input[0], "ahmed");
    const noData = await screen.findAllByRole("heading");
    expect(noData.innerHTML).toContain("لا يوجد أفلام");
  });
});
