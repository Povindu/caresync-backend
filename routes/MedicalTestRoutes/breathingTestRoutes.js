const express = require("express");
const {
  getPatientbreathingTestResult,
  createBreathingTestResult,
  deleteOneResult,
  deletebreathingTestResults,
} = require("../../controllers/MedicalTestControllers/breathingTestController");

const router = express.Router();

//get all results
// router.get("/", getbreathingTestResult);

//get one patients results
router.get("/:id", getPatientbreathingTestResult);

//post a new result
router.post("/", createBreathingTestResult);

//delete results
router.delete("/PatientData/:id", deletebreathingTestResults);

//delete result one by one
router.delete("/SingleTest/:id", deleteOneResult);

module.exports = router;
