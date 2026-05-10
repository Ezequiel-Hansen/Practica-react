import { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ModalError } from '../component/ModalError';

const listCinemas = [
    "Cinemark Hoyts", "Nuevo Monumental", "ShowCase Rosario",
    "Cines del centro", "Las Tipas", "Cine “El Cairo”"
];

export const MovieEdit = ({ movies, onEditMovie }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movieNotFound, setMovieNotFound] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formMovie, setformMovie] = useState({
        id: '', title: '', poster: '', duration: '',
        rating: '', synopsis: '', director: '',
        cinemas: [], time: '', date: ''
    });


useEffect(() => {
    const movie = movies.find(m => m.id.toString() === id);

    if (movie) {
        setformMovie(prev => ({
            ...prev,
            ...movie,
            cinemas: movie.cinemas || []
        }));
    } else if (movies.length > 0) {
        setMovieNotFound(true);
    }
}, [id, movies]);

if (movieNotFound) {
    return <Container className="mt-4"><h2>Película no encontrada</h2></Container>;
}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxCinema = (e) => {
        const { value, checked } = e.target;
        setformMovie(prev => ({
            ...prev,
            cinemas: checked 
                ? [...prev.cinemas, value] 
                : prev.cinemas.filter(cine => cine !== value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isInvalid = Object.values(formMovie).some(val => val === '' || (Array.isArray(val) && val.length === 0));
        
        if (isInvalid) {
            setShowModal(true);
            return;
        }

        onEditMovie(formMovie);
    };

    return (
        <>
            <Container className="mt-4" style={{ maxWidth: '600px' }}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2 className="mb-4 text-center">Editar Película</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Título:</strong></Form.Label>
                                <Form.Control
                                    name="title"
                                    value={formMovie.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><strong>URL del Póster:</strong></Form.Label>
                                <Form.Control
                                    type="url"
                                    name="poster"
                                    value={formMovie.poster}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Duración:</strong></Form.Label>
                                        <Form.Control
                                            name="duration"
                                            value={formMovie.duration}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Director:</strong></Form.Label>
                                        <Form.Control
                                            name="director"
                                            value={formMovie.director}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Clasificación:</strong></Form.Label>
                                        <Form.Select name="rating" value={formMovie.rating} onChange={handleChange}>
                                            <option value="">Selecciona...</option>
                                            <option value="Apta para todo público">Apta para todo público</option>
                                            <option value="Apta para mayores de 13 años">Mayores de 13 años</option>
                                            <option value="Apta para mayores de 18 años">Mayores de 18 años</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Horario:</strong></Form.Label>
                                        <Form.Select name="time" value={formMovie.time} onChange={handleChange}>
                                            <option value="">Selecciona...</option>
                                            <option value="19:00">19:00</option>
                                            <option value="21:00">21:00</option>
                                            <option value="23:00">23:00</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group className="mb-3">
                                        <Form.Label><strong>Fecha:</strong></Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formMovie.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Label><strong>Cines Disponibles:</strong></Form.Label>
                                <div className="border p-2 rounded">
                                    {listCinemas.map((cine, index) => (
                                        <Form.Check
                                            key={index}
                                            inline
                                            label={cine}
                                            value={cine}
                                            checked={formMovie.cinemas.includes(cine)}
                                            onChange={handleCheckboxCinema}
                                            type="checkbox"
                                            id={`cine-${index}`}
                                        />
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label><strong>Sinopsis:</strong></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="synopsis"
                                    value={formMovie.synopsis}
                                    onChange={handleChange}
                                    style={{ resize: 'none' }}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="success" type="submit" size="lg">
                                    Guardar Cambios
                                </Button>
                                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {showModal && (
                <ModalError
                    message="Por favor completa todos los campos obligatorios y selecciona al menos un cine."
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};