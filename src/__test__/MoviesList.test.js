import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieList from "../Components/MovieList";
import { renderWithRedux } from "./Utils/testRedux";
import { MemoryRouter } from "react-router-dom";
import { baseURL } from "./Utils/ApiLink";
import makeReq from "./Utils/mswMockReq";
