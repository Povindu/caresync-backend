const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
} = require("../controllers/authController");

const express = require("express");

const router = express.Router();

// Patient Sign-up
router.post("/signup", userSignUp);

// Patient Sign-in
router.post("/signin", userSignIn);

// Doctor Sign-up
router.post("/doctors/signup", doctorSignUp);

// Doctor Sign-in
router.post("/doctors/signin", doctorSignIn);

module.exports = router;
