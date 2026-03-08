import express from 'express';
import { validateRequest } from '../middleware/validateRequest.js';
import { createMovieSchema, updateMovieSchema } from '../validators/movieValidators.js';
// import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all movies');
});

router.post('/', validateRequest(createMovieSchema), (req, res) => {
  res.send('Create a new movie');
});

router.put('/', validateRequest(updateMovieSchema), (req, res) => {
  res.send('Update a movie');
});

router.delete('/', (req, res) => {
  res.send('Delete a movie');
});

export default router;