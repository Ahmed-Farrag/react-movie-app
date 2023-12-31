import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComp from "./Pagination";
import { getAllMovie } from "../Redux/Actions/MoviesAction";
import { useDispatch, useSelector } from "react-redux";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovie());
  }, []);

  const dataMovies = useSelector((state) => state.movies);

  useEffect(() => {
    setMovies(dataMovies);
  }, [dataMovies]);

  return (
    <Row className="mt-3">
      {movies.length >= 1 ? (
        movies.map((mov) => {
          return <CardMovie key={mov.id} mov={mov} />;
        })
      ) : (
        <p className="text-center p-5">لا يوجد افلام</p>
      )}
      {movies.length >= 1 ? <PaginationComp /> : null}
    </Row>
  );
};

export default MovieList;
