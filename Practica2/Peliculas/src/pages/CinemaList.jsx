import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CardMovie from '../component/CardMovie';
import { useState } from 'react';

function CinemaList({ movies, onDelete }) {
  const [movieDelete, setMovieDelete] = useState(null)
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Cartelera Rosario</h2>
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <CardMovie {...movie} onOpenModal={()=> setMovieDelete(movie.id)}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CinemaList;
