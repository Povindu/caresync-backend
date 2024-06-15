const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");

const PatientRoutes = require("./Patients");
const DoctorRoutes = require("./DoctorRoutes");
const authRoutes = require("./authRoutes");
const BreathingTestRoutes = require("./breathingTestRoutes");
const StepCounterTestRoutes = require("./stepCountTestRoutes");
const PatientHistoryRoutes = require("./patientHistoryRoutes");
const MedicalIncidentRoutes = require("./medicalIncidentRoutes");
const MedicalRecordRoutes = require("./medicalRecord.Routes");

const ExtTestRoutes = require("./ExternalTestResult.Routes");

const PortalAuthRoutes = require("./portalAuthRoutes");
const MedicationNewRoutes = require("./Medication.Routes");

router.use("/doctors", AuthMiddleware, DoctorRoutes);
router.use("/breathingTests", AuthMiddleware, BreathingTestRoutes);
router.use("/stepCounterTests", AuthMiddleware, StepCounterTestRoutes);
router.use("/patientsHistory", AuthMiddleware, PatientHistoryRoutes);
router.use("/patients", AuthMiddleware, PatientRoutes);
router.use("/medicalIncident", AuthMiddleware, MedicalIncidentRoutes);
router.use("/medicalRecord", AuthMiddleware, MedicalRecordRoutes);

router.use("/extTests", AuthMiddleware, ExtTestRoutes);
router.use("/medication", AuthMiddleware, MedicationNewRoutes);

router.use(authRoutes);
router.use("/portal/auth", PortalAuthRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "CareSync Test Endpoint v1" });
});

module.exports = router;
