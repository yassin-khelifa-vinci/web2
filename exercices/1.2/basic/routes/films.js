var express = require('express');
var router = express.Router();


const films = [
  {
    id : 1, title : "SpiderMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 2, title : "BatMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 3, title : "Hulk", duration : 120, budget : 200, link : "hviurnvjrojo"
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(films);
});

module.exports = router;
