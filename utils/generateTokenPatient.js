
const UserToken = require("../models/UserToken");
const jwt = require("jsonwebtoken");

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "2d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Error generating tokens:", err);
    return null;
  }
};

module.exports = { generateTokens };