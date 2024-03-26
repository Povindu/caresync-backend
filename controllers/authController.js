const mongoose = require("mongoose");
require("../models/Patient");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const { generateTokens } = require("../utils/generateTokenPatient");

const PatientData = mongoose.model("PatientData");
const Doctor = mongoose.model("Doctor");

const userSignUp = async (req, res) => {

  
  const { firstName, lastName, nic, email, password } = req.body;

  const existingUser = await PatientData.findOne({ email });

  if (existingUser) {
    return res.status(422).send({ error: "Email is in use" });
  }

  try {
    const user = new PatientData({ firstName, lastName, nic, email, password });
    await user.save();

    const { accessToken, refreshToken } = await generateTokens(user);

    res.send({ accessToken, refreshToken });

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    // res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await PatientData.findOne({ email });
  if (!user) {
    return res.status(200).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);

    const { accessToken, refreshToken } = await generateTokens(user);

    res.send({ accessToken, refreshToken });

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    // res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
};

const doctorSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    nic,
    email,
    password,
    medicalId,
    medicalIdVerify,
  } = req.body;

  const existingDoctor = await Doctor.findOne({ email });
  if (existingDoctor) {
    return res.status(422).send({ error: "Email is in use" });
  }

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

    const { accessToken, refreshToken } = await generateTokens(doctor);

    res.send({ accessToken, refreshToken });

    // const token = jwt.sign({ userId: doctor._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    // res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const doctorSignIn = async (req, res) => {
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

    const { accessToken, refreshToken } = await generateTokens(doctor);

    res.send({ accessToken, refreshToken });

    // const token = jwt.sign({ userId: doctor._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    // res.send({ token, medicalIdVerify: doctor.medicalIdVerify });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
};
