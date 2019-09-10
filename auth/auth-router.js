const router = require('express').Router();
const bcrypt = require('bcrypt');
const middleware = require('./jwt-middleware.js');

const Users = require('../users/users-model.js');

//  http://localhost:4000/api/auth/register
//	"username": "AwesomeJWT",
//	"password": "QuickestTokens"
router.post('/register', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  const token = middleware.generateToken(user);

  Users.add(user)
    .then(savedUser => {
      res.status(201).json({ user: savedUser, token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Use the credentials sent inside the body to authenticate the user.
// On successful login, sends a user a JWT
// If login fails, respond with the correct status code and the message: 'You shall not pass!'

// http://localhost:4000/api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = middleware.generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome Back ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
