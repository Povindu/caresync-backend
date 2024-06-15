// const express = require("express");
// const router = express.Router();
// const {
//   createTestMedicalIncident,
//   GetTestMedicalIncident,
// } = require("../controllers/MedicalIncident_Controllers/medicalIncidentTestController");

// const {
//   createSymptomMedicalIncident,
// } = require("../controllers/MedicalIncident_Controllers/medicalIncidentSymptomController");

// const {
//   createMedicationMedicalIncident,
// } = require("../controllers/MedicalIncident_Controllers/medicalIncidentMedicationController");

// const {
//   createAppointmentMedicalIncident,
// } = require("../controllers/MedicalIncident_Controllers/medicalIncidentAppointmentController");

// const {
//   createPrescriptionMedicalIncident,
// } = require("../controllers/MedicalIncident_Controllers/medicalIncidentPrescriptionController");

// // Define a single POST route
// router.post("/", (req, res, next) => {
//   const type = req.body.type;

//   switch (type) {
//     case "symptom":
//       createSymptomMedicalIncident(req, res, next); // If type is "symptom", call the first controller function
//       break;

//     case "test":
//       createTestMedicalIncident(req, res, next);
//       break;

//     case "medication":
//       createMedicationMedicalIncident(req, res, next);
//       break;

//     case "prescription":
//       createPrescriptionMedicalIncident(req, res, next);
//       break;


//     default:
//       createAppointmentMedicalIncident(req, res, next);
//       break;
//   }
// });

// // Get a test
// router.get("/", GetTestMedicalIncident);

// module.exports = router;
