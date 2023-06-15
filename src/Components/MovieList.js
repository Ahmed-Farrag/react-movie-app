import React from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComp from "./Pagination";

const MovieList = ({ movies, getPage, pageCount }) => {
  return (
    <Row className="mt-3">
      {movies.length >= 1 ? (
        movies.map((mov) => {
          return <CardMovie key={mov.id} mov={mov} />;
        })
      ) : (
        <p className="text-center p-5">لا يوجد افلام</p>
      )}
      {movies.length >= 1 ? (
        <PaginationComp getPage={getPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};

export default MovieList;
