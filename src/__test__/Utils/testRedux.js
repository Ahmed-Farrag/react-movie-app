import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { MovieReducer } from "../../Redux/Reducer/MovieReducer";
import thunk from "redux-thunk";

export const renderWithRedux = (
  component,
  {
    intialState,
    store = createStore(MovieReducer, intialState, applyMiddleware(thunk)),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};
