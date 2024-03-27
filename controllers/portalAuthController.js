const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

require("../models/PortalAdminModel");

const Admin = mongoose.model("Admin");

//Admin signup
const adminSignUp = async (req, res) => {
  console.log("adminsignup");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(401)
      .send({ error: "Must provide name, email and password" });
  }

  if (!validator.isEmail(email)) {
    return res.status(401).send({ error: "Email is not valid" });
  }

  try {
    const userFind = await Admin.findOne({ email });

    if (userFind) {
      return res.status(401).send({
        error:
          "Duplicate Email, please enter a diiferent email or signin using the email",
      });
    }

    const user = new Admin({ name, email, password });

    await user.save();

    res.status(200).send({ msg: "Signup Complete" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

// Admin signin
const adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ error: "Must provide email and password" });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign(
      { userId: user._id, username: user.name },
      process.env.JWT_KEY,
      {
        expiresIn: "3d",
      }
    );
    res.send({ token });
  } catch (err) {
    return res.status(401).send({ error: "Invalid password" });
  }
};

module.exports = {
  adminSignUp,
  adminSignIn,
};
