const express = require("express");
const { getPatients, getPatient, addDocAccess, deletePatient } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getPatients);

router.get("/patientId", getPatient);

router.delete("/:id", deletePatient);

router.patch("/addDocAccess/:id", addDocAccess);

module.exports = router;
