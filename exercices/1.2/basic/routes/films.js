var express = require('express');
var router = express.Router();
var app = express();

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

const films = [
  {
    id : 1, title : "SpiderMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 2, title : "BatMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  },
  {
    id : 3, title : "IronMan", duration : 120, budget : 200, link : "hviurnvjrojo"
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(films);
});

module.exports = router;
