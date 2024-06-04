const express = require("express");
const {
  getPatientsHistory,
  enterData,
} = require("../controllers/PatientHistoryControllers/PatientHistoryController");

const router = express.Router();

router.get("/", getPatientsHistory);
router.post("/", enterData);

module.exports = router;
