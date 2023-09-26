var express = require('express');
var router = express.Router();


const films = [
  {
    id : 1, title : "SpiderMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 2, title : "BatMan", duration : 150, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 3, title : "Hulk", duration : 180, budget : 200, link : "hviurnvjrojo"
  }
]

// Read the film identified by an id in the films table
router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  if (isNaN(parseInt(req.params.id))) return res.sendStatus(400);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(films[indexOfFilmFound]);
});

router.get('/', (req, res, next) => {
  const filter = parseInt(req?.query?.["minimum-duration"]);
  console.log(filter);
  const filteredByDuration =
    !isNaN(filter) ? filter : undefined;
  let filteredFilms;
  if (filteredByDuration)
    filteredFilms = [];
    for (const film of films) {
      if (film.duration >= filteredByDuration) filteredFilms.push(film); 
    }
  res.json(filteredFilms ?? films)
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration >= 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget >= 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /pizzas');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  if (films.findIndex((film) => film.title === title) >= 0) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex].id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    budget: budget,
    link: link
  };

  films.push(newFilm);

  res.json(newFilm);
});

module.exports = router;
