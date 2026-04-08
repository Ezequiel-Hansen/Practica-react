import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const MovieDetail= ({ movies })=> {
    const getRatingColor = (ratingString) => {
    if (!ratingString) return 'success';

    const match = ratingString.match(/\d+/);

    if (match) {
      const age = parseInt(match[0], 10);
      return age >= 18 ? 'danger' : 'success';
    }

    return 'success';
  };
  const { id } = useParams();
  const movie = movies.find(m => m.id.toString() === id);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <img src={movie.poster} alt={movie.title} className="img-fluid rounded shadow" />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <h2>Director: {movie.director}</h2>
          <Badge bg={getRatingColor(movie.rating)} className="mb-3">{movie.rating}</Badge>
          <p><strong>Duración:</strong> {movie.duration}</p>
          <hr />
          <h3>Sinopsis</h3>
          <p>{movie.synopsis}</p>
          <hr />
          <h4>Disponible en cine</h4>
          <p> {movie.cinemas.join(', ')}</p>
        </Col>
      </Row>
    </Container>
  );
}
export default MovieDetail;