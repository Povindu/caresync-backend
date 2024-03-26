const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
} = require("../controllers/authController");

const express = require("express");

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
