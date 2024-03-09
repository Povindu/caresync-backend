const express = require("express");
const {
  getPatientsHistory,
} = require("../controllers/PatientHistoryController");

const router = express.Router();

router.get("/", getPatientsHistory);

module.exports = router;
