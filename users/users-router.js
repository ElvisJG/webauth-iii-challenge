const router = require('express').Router();

const Users = require('./users-model.js');
const middleware = require('../auth/jwt-middleware.js');

// Middleware verifies of the token is valid

// http://localhost:5000/api/users
router.get('/', middleware.restrict, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
