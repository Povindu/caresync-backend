const express = require("express");
const router = express.Router();

const PatientRoutes = require("./Patients");
const DoctorRoutes = require("./DoctorRoutes");
const authRoutes = require("./authRoutes");
const BreathingTestRoutes = require("./breathingTestRoutes");
const StepCounterTestRoutes = require("./stepCountTestRoutes");
const MedicationRoutes = require("./medicationRoutes");
const PatientHistoryRoutes = require("./patientHistoryRoutes");
const PortalAuthRoutes = require("./portalAuthRoutes");
const MedicalIncidentRoutes = require("./MedicalIncidentRoutes");

router.use(authRoutes);
router.use("/doctors", DoctorRoutes);
router.use("/breathingTests", BreathingTestRoutes);
router.use("/stepCounterTests", StepCounterTestRoutes);
router.use("/patientsHistory", PatientHistoryRoutes);
router.use("/patients", PatientRoutes);
router.use("/medications", MedicationRoutes);
router.use("/portal/auth", PortalAuthRoutes);
router.use("/medicalIncident", MedicalIncidentRoutes);

module.exports = router;
