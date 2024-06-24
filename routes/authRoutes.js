const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
  refreshAT,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  changePassword,
  getOTP,
  verifyOtpPatient,
  checkEmailExists,
  checkEmailExistsDoctors,
} = require("../controllers/authController");

// Patient Sign-up
router.post("/signup", userSignUp);

// Patient Sign-in
router.post("/signin", userSignIn);

// Doctor Sign-up
router.post("/doc/signup", doctorSignUp);

// Doctor Sign-in
router.post("/doc/signin", doctorSignIn);

// Refresh Access Token
router.post("/refreshAT", refreshAT);

// Forgot Password
router.post("/forgotPassword", forgotPassword);

//otp verification
router.post("/verifyOTP", verifyOTP);

//password reset
router.post("/resetPassword", resetPassword);

//resend OTP
router.post("/resendOTP", resendOTP);

//change password
router.post("/changePassword", changePassword);

//get otp when patient register
router.post("/getOTP", getOTP);

// OTP Verification patient Register
router.post("/verifyOtpPatient", verifyOtpPatient);

// Endpoint to check if an email exists patients
router.get("/:email", checkEmailExists);

// Endpoint to check if an email exists doctors
router.get("/:doctors/:email", checkEmailExistsDoctors);

module.exports = router;
