/* eslint-disable no-undef */
import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import MovieList from "./Components/MovieList";
import NavBar from "./Components/NavBar";
import MovieDetails from "./Components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="font color-body">
      <NavBar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
