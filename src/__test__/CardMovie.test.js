import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
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

const renderCard = () => {
  renderWithRedux(
    <MemoryRouter>
      <CardMovie mov={mov} />
    </MemoryRouter>
  );
};

describe("test ui for card", () => {
  test("card ui", async () => {
    renderCard();
    const img = await screen.findByRole("img");
    expect(img.getAttribute("src")).toBe(
      `https://image.tmdb.org/t/p/w500/${mov.poster_path}`
    );
    const overlay = await screen.findByTestId("overlay");
    userEvent.hover(overlay);
    const p = await screen.findByTestId("p1");
    expect(p.innerHTML).toBe(`اسم الفيلم: ${mov.title}`);
    // expect(p[1].innerHTML).toBe(`تاريخ الاصدار: {mov.release_date}`);
  });
});

describe("test link url", () => {
  test("url", async () => {
    renderCard();
    const link = await screen.findAllByRole("link");
    expect(link).toHaveLength(1);
    expect(link[0].getAttribute("href")).toBe(`/movie/${mov.id}`);
  });
});
