import { ALLMOVIES } from "../Types/MoviesType";

const initalValue = { movies: [], PageCount: 0 };
export const MovieReducer = (state = initalValue, action) => {
  switch (action.type) {
    case ALLMOVIES:
      return { movies: action.data, PageCount: action.pages };
    default:
      return state;
  }
};
