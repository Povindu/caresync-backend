const {
  adminSignUp,
  adminSignIn,
} = require("../controllers/portalAuthController");


const express = require("express");
const router = express.Router();

// Admin Sign-up
router.post("/signup", adminSignUp);

// Admin Sign-in
router.post("/signin", adminSignIn);


module.exports = router;
