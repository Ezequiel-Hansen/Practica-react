import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const listCinemas = [
    "Cinemark Hoyts",
    "Nuevo Monumental",
    "ShowCase Rosario",
    "Cines del centro",
    "Las Tipas",
    "Cine “El Cairo”"
];

const NewMovie = ({ onAddMovie }) => {
    const [formMovie, setformMovie] = useState({
        title: '',
        poster: '',
        duration: '',
        rating: '',
        synopsis: '',
        director: '',
        cinemas: [],
        time: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformMovie({
            ...formMovie,
            [name]: value
        });
    };

    const handleCheckboxCinema = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setformMovie({
                ...formMovie,
                cinemas: [...formMovie.cinemas, value]
            });
        } else {
            setformMovie({
                ...formMovie,
                cinemas: formMovie.cinemas.filter(cine => cine !== value)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formMovie.title || !formMovie.poster) {
            alert("Por favor completa al menos el título y el póster.");
            return;
        }

        const newMovie = {
            ...formMovie,
            id: Date.now()
        };

        onAddMovie(newMovie);

        setformMovie({
            title: '',
            poster: '',
            duration: '',
            rating: '',
            synopsis: '',
            director: '',
            cinemas: [],
            time: '',
            date: ''
        });
    };

    const handleDateChange = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate())
        const formattedDate = `${year}-${month}-${day}`;
        setformMovie({
            ...formMovie,
            date: formattedDate
        });
    }
    return (

        <Container className="mt-4" style={{ maxWidth: '600px' }}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="mb-4 text-center">Agregar Nueva Película</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label><strong>Título de la película:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: El Padrino"
                                name="title"
                                value={formMovie.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPoster">
                            <Form.Label><strong>URL del Póster (Imagen):</strong></Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="https://ejemplo.com/imagen.jpg"
                                name="poster"
                                value={formMovie.poster}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formDuration">
                                    <Form.Label><strong>Duración:</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: 120 min"
                                        name="duration"
                                        value={formMovie.duration}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formDirector">
                                    <Form.Label><strong>Director:</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: Christopher Nolan"
                                        name="director"
                                        value={formMovie.director}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formRating">
                                    <Form.Label><strong>Clasificación:</strong></Form.Label>
                                    <Form.Select
                                        name="rating"
                                        value={formMovie.rating}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Apta para todo público">Apta para todo público</option>
                                        <option value="Apta para mayores de 13 años">Mayores de 13 años</option>
                                        <option value="Apta para mayores de 18 años">Mayores de 18 años</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="formTime">
                                    <Form.Label><strong>Horario:</strong></Form.Label>
                                    <Form.Select
                                        name="time"
                                        value={formMovie.time}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="19:00">19:00</option>
                                        <option value="21:00">21:00</option>
                                        <option value="23:00">23:00</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                    <Form.Label><strong>Fecha:</strong></Form.Label>
                                    <Calendar onChange={handleDateChange} value={formMovie.date} />
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label><strong>Cines Disponibles:</strong></Form.Label>
                                    <div>
                                        {listCinemas.map((cine, index) => (
                                            <Form.Check
                                                key={index}
                                                inline
                                                label={cine}
                                                value={cine}
                                                checked={formMovie.cinemas.includes(cine)}
                                                onChange={handleCheckboxCinema}
                                                type="checkbox"
                                                id={`cine-checkbox-${index}`}
                                            />
                                        ))}
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-4" controlId="formSinopsis">
                            <Form.Label><strong>Sinopsis:</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="De qué trata la película..."
                                name="synopsis"
                                value={formMovie.synopsis}
                                onChange={handleChange}
                                style={{ resize: 'none' }}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar Película
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NewMovie;