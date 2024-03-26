const mongoose = require("mongoose");
require("../models/Patient");
const jwt = require("jsonwebtoken");

const PatientData = mongoose.model("Patient");

const Doctor = mongoose.model("Doctor");

// const { generateTokens, generateAccessToken } = require("../utils/doctorTokenGenerate/generateAccessTokenDoctor");

const {
  generateRefreshToken,
} = require("../utils/TokenGenarate/generateRefreshToken");

const {
  generateAccessToken,
} = require("../utils/TokenGenarate/generateAccessToken");

// const generateAccessTokenPatient = require("../utils/patientTokenGenerate/generateAccessTokenPatient");

// const generateRefreshTokenPatient = require("../utils/patientTokenGenerate/generateRefreshTokenPatient");

// const generateAccessTokenDoctor = require("../utils/doctorTokenGenerate/generateAccessTokenDoctor");
// const generateRefreshTokenDoctor = require("../utils/doctorTokenGenerate/generateRefreshTokenDoctor");
// const generateRefreshTokenPatient = require("../utils/patientTokenGenerate/generateRefreshTokenPatient");
const e = require("express");

const userSignUp = async (req, res) => {
  const { firstName, lastName, nic, email, password } = req.body;

  const existingUser = await PatientData.findOne({ email });

  if (existingUser) {
    return res.status(422).send({ error: "Email is in use" });
  }

  try {
    const user = new PatientData({ firstName, lastName, nic, email, password });
    await user.save();

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

    const accessToken = generateAccessTokenPatient({
      _id: user._id,
      roles: user.roles,
      fName: user.fName,
      lName: user.lName,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
      roles: user.roles,
      fName: user.fName,
      lName: user.lName,
    });

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

    

    // const token = jwt.sign({ userId: doctor._id }, process.env.JWT_KEY,{expiresIn: '2d'});
    res.send("Doctor created");
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const doctorSignIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const doctor = await Doctor.findOne({ email });
  console.log(doctor);
  if (!doctor) {
    return res.status(422).send({ error: "Invalid email or password" });
  }

  try {
    await doctor.comparePassword(password);

    console.log("password okay");

    console.log(doctor._id, doctor.role, doctor.firstName, doctor.lastName);

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

    res.send({ accessToken, refreshToken });

    
  } catch (err) {
    return res.status(422).send({ error: "error" });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
};


