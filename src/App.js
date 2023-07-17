import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import MovieList from "./Components/MovieList";
import NavBar from "./Components/NavBar";
import MovieDetails from "./Components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // get all movie by axios
  const getAllMovie = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar"
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  // get current page
  const getPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  useEffect(() => {
    getAllMovie();
  }, []);

  //to search in api
  const search = async (word) => {
    if (word === "") {
      getAllMovie();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${word}&language=ar`
      );
      setMovies(res.data.results);
      // setpageCount(res.data.total_pages);
    }
  };
  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  movies={movies}
                  getPage={getPage}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
