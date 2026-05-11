import { Router } from "express";
import { getMovie, getMovies, updateMovie, deleteMovie, createMovie } from "../controller/movie.controller.js";
const router= Router()

router
        .get('/movies', getMovies)
        .get('/movie/:id', getMovie)
        .patch('/movie/:id', updateMovie)
        .delete('/movie/:id',deleteMovie)
        .post('/createMovie',createMovie)

export default router;