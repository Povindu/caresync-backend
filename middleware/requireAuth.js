const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const User = mongoose.model("User");
const Doctor = mongoose.model("Doctor");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    try {
      // Try to find user or doctor with the given ID
      let user = await User.findById(userId);
      if (!user) {
        user = await Doctor.findById(userId);
        if (!user) {
          return res.status(401).send({ error: 'User not found.' });
        }
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('Error finding user:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};
