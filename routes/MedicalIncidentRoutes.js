const express = require("express");
const router = express.Router();
const {
  createTestMedicalIncident,
  GetTestMedicalIncident,
} = require("../controllers/PatientHistoryControllers/medicalIncidentController");

const {
  createSymptomMedicalIncident,
} = require("../controllers/PatientHistoryControllers/medicalIncidentSymptomController");

const {
  createMedicationMedicalIncident,
} = require("../controllers/PatientHistoryControllers/medicalIncidentMedicationController");

const {
  createAppointmentMedicalIncident,
} = require("../controllers/PatientHistoryControllers/medicalIncidentAppointmentController");

// Define a single POST route
router.post("/", (req, res, next) => {
  const type = req.body.type;

  console.log("Type: ", type);

  switch (type) {
    case "symptom":
      createSymptomMedicalIncident(req, res, next); // If type is "symptom", call the first controller function
      break;

    case "test":
      createTestMedicalIncident(req, res, next);
      break;

    case "medication":
      createMedicationMedicalIncident(req, res, next);
      break;

    default:
      createAppointmentMedicalIncident(req, res, next);
      break;
  }
});

// Get a test
router.get("/", GetTestMedicalIncident);

module.exports = router;
