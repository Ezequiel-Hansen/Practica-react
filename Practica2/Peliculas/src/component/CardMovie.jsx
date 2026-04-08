import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function CardMovie({id, title, poster, duration, sinopsis, rating, onOpenModal }) {

  const getRatingColor = (ratingString) => {
    if (!ratingString) return 'success';

    const match = ratingString.match(/\d+/);

    if (match) {
      const age = parseInt(match[0], 10);
      return age >= 18 ? 'danger' : 'success';
    }

    return 'success';
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={poster} />

      <Card.Body className="d-flex flex-column">

        <Card.Title>{title}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          Duración: {duration}
        </Card.Subtitle>

        <h6 className="mb-3">
          <Badge bg={getRatingColor(rating)}>{rating}</Badge>
        </h6>

        <Card.Text>
          {sinopsis}
        </Card.Text>

        <div className="d-flex justify-content-between mt-auto">
          <Button as={Link} to={`/movie/${id}`} variant="warning">
            Ver detalles
          </Button>
          <Button variant="danger">Eliminar</Button>
        </div>

      </Card.Body>
    </Card>
  );
}

export default CardMovie;