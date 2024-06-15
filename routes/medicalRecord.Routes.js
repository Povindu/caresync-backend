const express = require("express");
const {
  createRecord,
  getAllRecordsOfPatient,
  getRecord
} = require("../controllers/medicalRecord.Controller.js");

const router = express.Router();


//post a new result
router.post("/create/", createRecord);
router.get("/getRecordsPatient/", getAllRecordsOfPatient);
router.get("/getRecord/", getRecord);


module.exports = router;
