const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn
}=require('../controllers/authController')

// import {userSignUp,
//   userSignIn,
//   doctorSignUp,
//   doctorSignIn} from '../controllers/authController'

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Doctor = mongoose.model("Doctor");

const router = express.Router();

// Patient (User) Sign-up
router.post("/signup", userSignUp);

// Patient (User) Sign-in
router.post("/signin", userSignIn);

// Doctor Sign-up
router.post("/doctors/signup", doctorSignUp);

// Doctor Sign-in
router.post("/doctors/signin", doctorSignIn);

module.exports = router;
