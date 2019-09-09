module.exports = function generateToken(user) {
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
};

module.exports = function restrict(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Whoa There Cowboy, Invalid Credentials' });
  }
};
