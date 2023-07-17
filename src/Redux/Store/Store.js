import { createStore, applyMiddleware } from "redux";
import { MovieReducer } from "../Reducer/MovieReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(MovieReducer, applyMiddleware(thunk));
