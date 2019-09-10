const jwt = require('jsonwebtoken');

module.exports = {
  generateToken,
  restrict
};

function generateToken(user) {
  const payload = {
    subject: user.id, // subject is required
    username: user.username // This sends the username, it is not required
    // You can send more information through a JWT but it is NOT recommended as it can be
    // Easily decoded.
  };
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, process.env.SECRET, options);
}

function restrict(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'not verified'
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'no token provided'
    });
  }
}
