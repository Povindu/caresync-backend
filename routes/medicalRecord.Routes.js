const express = require("express");
const {
  createMedicalRecord,
  getAllMedicalRecords,
} = require("../controllers/medicalRecord.Controller.js");

const router = express.Router();


//post a new result
router.post("/create/", createMedicalRecord);
router.get("/getAll/", getAllMedicalRecords);

module.exports = router;
