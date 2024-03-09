// backend/controllers/patientHistoryController.js

const PatientHistory = require("../models/patientHistory");

// Get all patients history
const getPatientsHistory = async (req, res) => {
  try {
    const patientsHistory = await PatientHistory.find({}).sort({
      createdAt: -1,
    });
    console.log(patientsHistory);
    res.status(200).json(patientsHistory);
  } catch (error) {
    console.error("Error fetching patients history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPatientsHistory,
};
