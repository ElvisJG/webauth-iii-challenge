const router = require('express').Router();

const Users = require('./users-model.js');
const middleware = require('../auth/jwt-middleware.js');

// Middleware verifies of the token is valid

// http://localhost:5000/api/users
// Admin: 	"username": "SuperFastRequestMan",
//        	"password": "QuickestRequestsInTheW3St"
// User:    "username": "Elvis",
//          "password": "yoikes"
router.get('/', middleware.restrict, (req, res) => {
  const { department } = req.decodedToken;

  if (department === 'admin') {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  } else {
    Users.findByDepartment(department).then(department => {
      res.json(department);
    });
  }
});

module.exports = router;
