import NodeCache from 'node-cache';
import { Movie } from '../model/movie.model.js';
import { Cinema } from '../model/cinemas.model.js';
import { Screen } from '../model/Screen.model.js';

const cache = new NodeCache({ stdTTL: 0 });
const CACHE_KEY = 'movies';

const MOVIE_INCLUDE = {
  include: {
    model: Screen,
    as: 'screenings',
    include: { model: Cinema, as: 'cinema' },
  },
};

export const getMovies = async (req, res) => {
  try {
    if (cache.has(CACHE_KEY)) {
      return res.json(cache.get(CACHE_KEY));
    }

    const movies = await Movie.findAll(MOVIE_INCLUDE);
    const plain = movies.map(m => m.toJSON());
    cache.set(CACHE_KEY, plain);
    res.json(plain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, MOVIE_INCLUDE);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, director, duration, rating, poster, synopsis, cinemas, date, time } = req.body;

    const existing = await Movie.findOne({ where: { title } });
    if (existing) {
      return res.status(409).json({ message: 'Ya existe una película con ese título' });
    }

    const movie = await Movie.create({ title, director, duration, rating, poster, synopsis });

    if (Array.isArray(cinemas)) {
      for (const { name, date, time } of cinemas) {
        const [cinema] = await Cinema.findOrCreate({ where: { name } });
        await Screen.create({
          movie_id: movie.id,
          cinema_id: cinema.id,
          Screen_date: date,
          Screen_time: time,
        });
      }
    }

    cache.del(CACHE_KEY);

    const result = await Movie.findByPk(movie.id, MOVIE_INCLUDE);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    const { title, director, duration, rating, poster, synopsis } = req.body;
    await movie.update({ title, director, duration, rating, poster, synopsis });

    cache.del(CACHE_KEY);

    const result = await Movie.findByPk(movie.id, MOVIE_INCLUDE);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Película no encontrada' });

    cache.del(CACHE_KEY);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};