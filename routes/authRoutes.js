const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");
const Doctor = mongoose.model("Doctor");

const router = express.Router();

// Patient (User) Sign-up
router.post("/signup", async (req, res) => {
  const { firstName, lastName, nic, email, password } = req.body;

  try {
    const user = new User({ firstName, lastName, nic, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

// Patient (User) Sign-in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

// Doctor Sign-up
router.post("/doctors/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    nic,
    email,
    password,
    medicalId,
    medicalIdVerify,
  } = req.body;

  try {
    const doctor = new Doctor({
      firstName,
      lastName,
      nic,
      email,
      password,
      medicalId,
      medicalIdVerify,
    });
    await doctor.save();

    const token = jwt.sign({ userId: doctor._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

// Doctor Sign-in
router.post("/doctors/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return res.status(422).send({ error: "Invalid email or password" });
  }

  try {
    await doctor.comparePassword(password);
    const token = jwt.sign({ userId: doctor._id }, "MY_SECRET_KEY");
    res.send({ token, medicalIdVerify: doctor.medicalIdVerify });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
