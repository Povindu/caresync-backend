const express = require("express");

const {
  getDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
  addPatientAccess,
  verifyDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Get a doctor
router.get("/:id", getDoctor);

// Delete a doctor
router.delete("/:id", deleteDoctor);

 // Update a doctor
router.patch("/:id", updateDoctor);

// Add patient access to doctor
router.patch("/addPatientAccess/:id", addPatientAccess);

// Verify a doctor
router.patch("/verifyDoctor/:id", verifyDoctor);

module.exports = router;

