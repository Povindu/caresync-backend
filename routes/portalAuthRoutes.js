const {
  adminSignUp,
  adminSignIn,
} = require("../controllers/portalAuthController");


const express = require("express");
const router = express.Router();


router.post("/signup", adminSignUp);
router.post("/signin", adminSignIn);


module.exports = router;
