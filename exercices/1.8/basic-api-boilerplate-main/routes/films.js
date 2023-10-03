/* eslint-disable no-console */
const express = require('express');
const path = require('node:path');

const jsonDbPath = path.join(__dirname, '/../data/films.json');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const FILMS = [
  {
    id: 1,
    title: 'SpiderMan',
    duration: 120,
    budget: 200,
    link: 'hviurnvjrojo',
  },
  {
    id: 2,
    title: 'BatMan',
    duration: 150,
    budget: 200,
    link: 'hviurnvjrojo',
  },
  {
    id: 3,
    title: 'Hulk',
    duration: 180,
    budget: 200,
    link: 'hviurnvjrojo',
  },
];

// Read the film identified by an id in the films table
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const indexOfFilmFound = films.findIndex((film) => film.id === Number(req.params.id));

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

router.get('/', (req, res) => {
  const filter = parseInt(req?.query?.['minimum-duration'], 10);
  console.log(filter);
  const filteredByDuration = !filter.isNaN ? filter : undefined;
  let filteredFilms;
  const films = parse(jsonDbPath, FILMS);
  if (filteredByDuration) {
    filteredFilms = films.filter((film) => film.duration >= filteredByDuration);
  }
  res.json(filteredFilms ?? films);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration >= 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget >= 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /films');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const films = parse(jsonDbPath, FILMS);

  if (films.findIndex((film) => film.title === title) >= 0) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex].id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link,
  };

  films.push(newFilm);
  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

router.delete('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const indexFilm = films.findIndex((film) => film.id === Number(req.params.id));
  if (indexFilm < 0) return res.sendStatus(404);
  const itemRemoved = films.splice(indexFilm, 1);

  serialize(jsonDbPath, films);

  return res.json(itemRemoved[0]);
});

router.patch('/:id', (req, res) => {
  if (Number(req.params.id).isNaN) return res.sendStatus(400);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  console.log(title?.length === 0);

  if (
    (!title && !duration && !budget && !link) ||
    title?.length === 0 ||
    duration <= 0 ||
    budget <= 0 ||
    link?.length === 0
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  if (foundIndex < 0) return res.sendStatus(404);

  const itemUpdated = { ...films[foundIndex], ...req.body };
  films[foundIndex] = itemUpdated;

  serialize(jsonDbPath, films);

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

  const films = parse(jsonDbPath, FILMS);
  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  let item;

  console.log(films);

  if (foundIndex < 0) {
    item = {
      id: films.length !== 0 ? films[films.length - 1].id + 1 : 1,
      title,
      duration,
      budget,
      link,
    };
    films.push(item);
  } else {
    item = { ...films[foundIndex], ...req.body };
    films[foundIndex] = item;
  }

  serialize(jsonDbPath, films);

  return res.json(item);
});

module.exports = router;
