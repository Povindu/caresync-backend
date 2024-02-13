const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/UserNew");

const router = express.Router();

// Signup Route
router.post(
  "/signup",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("firstName").trim().notEmpty(),
  body("lastName").trim().notEmpty(),
  body("nic").trim().isLength({ min: 10, max: 12 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, nic } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        nic,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      res.status(201).json({ token });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Signin Route
router.post(
  "/signin",
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
