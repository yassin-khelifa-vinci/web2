const path = require('node:path');

const jsonDbPath = path.join(__dirname, '/../data/films.json');
const { serialize, parse } = require('../utils/json');

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

function readOneFilm(id) {
    const films = parse(jsonDbPath, FILMS);
  
    const indexOfFilmFound = films.findIndex((film) => film.id === Number(id));
  
    if (indexOfFilmFound < 0) return undefined;
  
    return films[indexOfFilmFound];
  }

function readAllFilms(order) {
    let filteredFilms;
    const films = parse(jsonDbPath, FILMS);
    if (order) {
    filteredFilms = films.filter((film) => film.duration >= order);
    }
    return filteredFilms ?? films;
}

function createFilm(title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);

    if (films.findIndex((film) => film.title === title) >= 0) return undefined;

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

    return newFilm;
}

function deleteOneFilm(id) {
    const films = parse(jsonDbPath, FILMS);

    const indexOfFilmFound = films.findIndex((film) => film.id === Number(id));

    if (indexOfFilmFound < 0) return undefined;

    const filmDeleted = films.splice(indexOfFilmFound, 1);

    serialize(jsonDbPath, films);

    return filmDeleted;
}

function updateOneFilm(id, title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex((film) => film.id === Number(id));
  
    if (foundIndex < 0) return undefined;

    const body = { title, duration, budget, link };
  
    const itemUpdated = { ...films[foundIndex], ...body };
    films[foundIndex] = itemUpdated;
  
    serialize(jsonDbPath, films);
  
    return itemUpdated;
}

function updateOneFilmAll(id, title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex((film) => film.id === Number(id));

    let itemUpdated;

    if (foundIndex < 0) {
        itemUpdated = {
        id: films.length !== 0 ? films[films.length - 1].id + 1 : 1,
        title,
        duration,
        budget,
        link,
        };
        films.push(itemUpdated);
    } else {
        itemUpdated = { ...films[foundIndex], title, duration, budget, link };
        films[foundIndex] = itemUpdated;
    }

    serialize(jsonDbPath, films);

    return itemUpdated;
}

module.exports = {
    readOneFilm,
    readAllFilms,
    createFilm,
    deleteOneFilm,
    updateOneFilm,
    updateOneFilmAll,
};