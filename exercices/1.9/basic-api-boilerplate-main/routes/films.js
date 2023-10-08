/* eslint-disable no-console */
const express = require('express');
const {
  readAllFilms,
  readOneFilm,
  createFilm,
  deleteOneFilm,
  updateOneFilm,
  updateOneFilmAll,
} = require('../models/films');

const router = express.Router();

// Read the film identified by an id in the films table
router.get('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const film = readOneFilm(req.params.id);

  if (film < 0) return res.sendStatus(404);

  return res.json(film);
});

router.get('/', (req, res) => {
  res.json(readAllFilms(req.query.order));
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration >= 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget >= 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const newFilm = createFilm(title, duration, budget, link);

  if (!newFilm) return res.sendStatus(409);

  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const deletedFilm = deleteOneFilm(req.params.id);
  if (!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

router.patch('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    duration <= 0 ||
    budget <= 0 ||
    link?.length === 0
  )
    return res.sendStatus(400);

  const itemUpdated = updateOneFilm(req.params.id, req.body);

  if (!itemUpdated) return res.sendStatus(404);

  return res.json(itemUpdated);
});

router.put('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log(title?.length === 0);

  if (
    (!title && !duration && !budget && !link) ||
    title === undefined ||
    title?.length === 0 ||
    duration === undefined ||
    duration <= 0 ||
    budget === undefined ||
    budget <= 0 ||
    link === undefined ||
    link?.length === 0
  )
    return res.sendStatus(400);

  const filmUpdated = updateOneFilmAll(
    req.params.id,
    title,
    duration,
    budget,
    link
  );

  return res.json(filmUpdated);
});

module.exports = router;
