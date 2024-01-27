import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardMovie = ({ mov }) => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <Link to={`/movie/${mov.id}`}>
        <div className="card" data-testid="overlay">
          <img
            src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
            className="card__image"
            alt="hu"
          />
          <div className="card__overlay">
            <div className="overlay__text text-center w-100 p-2">
              <p data-testid="p1">اسم الفيلم: {mov.title}</p>
              <p data-testid="p2">تاريخ الاصدار: {mov.release_date}</p>
              <p data-testid="p3">عدد المقيمين: {mov.vote_count} </p>
              <p data-testid="p4"> التقييم: {mov.vote_average}</p>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default CardMovie;
