var express = require('express');
var router = express.Router();
const User = require('../models/users');

router.get('/', (req, res, next) => {
  const promise = User.find({});

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/register', (req, res) => {
  console.log(req.body);
  const user = new User({
    ...req.body,
  });
  const promise = user.save();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
