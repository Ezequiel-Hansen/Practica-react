import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';


const MovieDetail = ({ movies }) => {
  const getRatingColor = (ratingString) => {
    if (!ratingString) return 'success';

    const match = ratingString.match(/\d+/);

    if (match) {
      const age = parseInt(match[0], 10);
      switch (true) {
        case age < 13:
          return 'success';
        case age < 18:
          return 'warning';
        default:
          return 'danger';
      };
    }

    return 'success';
  };
  const { id } = useParams();
  const movie = movies.find(m => m.id.toString() === id);

  return (
    <Container className="mt-5">
      <Link to ={`/edit/${id}`}>
      <Button variant="warning">Edit</Button>
      </Link>
      <Row>
        <Col md={4}>
          <img src={movie.poster} alt={movie.title} className="img-fluid rounded shadow" />
        </Col>
        <Col md={8}>
          <Badge bg={getRatingColor(movie.rating)} className="mb-3">{movie.rating}</Badge>
          <h1>{movie.title}</h1>
          <h3>Director: {movie.director}</h3>
          <p><strong>Duración:</strong> {movie.duration}</p>
          <p><strong>Fecha de estreno:</strong> {movie.date}</p>
          <p><strong>Hora:</strong> {movie.time}</p>
          <p><strong>En cines disponibles:</strong> {movie.cinemas.join(', ')}</p>
          <hr />
          <h3>Sinopsis</h3>
          <p>{movie.synopsis}</p>
        </Col>
      </Row>
    </Container>
  );
}
export default MovieDetail;