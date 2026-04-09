import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
function CardMovie({id, title, poster, duration, sinopsis, rating, onDelete }) {
  const [showModal, setShowModal] = useState(false);

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
      }
    }
    return 'success';
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleModalDelete = () => {
    onDelete(id);
    handleCloseModal();
  }


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
          <Button variant="danger" onClick={handleShowModal}>
            Eliminar
          </Button>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¿Estas Seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Quieres eliminar la pelicula "{title}"?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleModalDelete}>
            Eliminar Definitivamente
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

      </Card.Body>
    </Card>
  );
}

export default CardMovie;