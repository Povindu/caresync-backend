const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("No authorization header found in request.");
    return res.status(401).send({ error: "You must be logged in." });
    // next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded;
    console.log("JWT Token decoded: " + JSON.stringify(decoded));
    next();
  } catch (error) {
    console.log("err", error);
    // console.log(
    //   "Auth failed, Temporarily letting it pass for testing purposes."
    // );
    // next(); //TODO: remove this line and uncomment below lines when frontend authorization is ready
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
