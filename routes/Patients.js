const express = require("express");
const { getPatients, getPatient, addDocAccess } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getPatients);

router.get("/patientId", getPatient);

router.patch("/addDocAccess/:id", addDocAccess);

module.exports = router;
