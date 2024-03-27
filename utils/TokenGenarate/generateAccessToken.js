const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  console.log("payload", payload);

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateAccessToken };
