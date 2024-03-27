const mongoose = require("mongoose");

require("../models/Patient");
const jwt = require("jsonwebtoken");

const Patient = mongoose.model("Patient");
const Doctor = mongoose.model("Doctor");

const {
  generateRefreshToken,
} = require("../utils/TokenGenarate/generateRefreshToken");

const {
  generateAccessToken,
} = require("../utils/TokenGenarate/generateAccessToken");

const e = require("express");

const userSignUp = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, nic, email, password } = req.body;

  const existingUser = await Patient.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ error: "Email is in use" });
  }

  try {
    const user = new Patient({ firstName, lastName, nic, email, password });
    await user.save();

    res.status(200).send();

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const userSignIn = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const user = await Patient.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: "Invalid email" });
  }

  try {
    await user.comparePassword(password);
  } catch (err) {
    return res.status(400).send({ error: "Invalid password or email" });
  }

  try {
    console.log(user._id, user.role, user.firstName, user.lastName);
    const accessToken = await generateAccessToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });

    res.status(200).send({ accessToken, refreshToken });

    // const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    // res.send({ token });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
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
    return res.status(400).send({ error: "Email is in use" });
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

    // const token = jwt.sign({ userId: doctor._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const doctorSignIn = async (req, res) => {
  // console.log(req.body.medicalIdVerify);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const doctor = await Doctor.findOne({ email });
  const medicalId = doctor.medicalIdVerify;

  if (!doctor) {
    return res.status(400).send({ error: "Invalid email" });
  }

  try {
    await doctor.comparePassword(password);
    console.log("password okay");
  } catch (err) {
    return res.status(400).send({ error: "Invalid Password" });
  }

  try {
    console.log(doctor._id, doctor.role, doctor.firstName, doctor.lastName);

    if (medicalId == false) {
      return res.status(400).send({ error: "Medical Id not verified" });
    }

    const accessToken = await generateAccessToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    res.send({ accessToken, refreshToken, medicalId });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
};
