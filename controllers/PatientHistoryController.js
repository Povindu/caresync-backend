// backend/controllers/patientHistoryController.js

// const PatientHistory = require("../models/patientHistory");
const Patient = require("../models/Patient");
const PatientHistory = require("./../models/patientHistory");

// Get all patients history
const getPatientsHistory = async (req, res) => {
  try {
    console.log("Fetching patients history");
    const patientsHistory = await PatientHistory.find({}).sort({ createdAt: -1 });;
    // .sort({
    //   createdAt: -1,
    // });
    console.log(patientsHistory);
    res.status(200).json(patientsHistory);
  } catch (error) {
    console.error("Error fetching patients history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const enterData = async (req, res) => {
  const { recordId, title, date, description, doctor, symptom, presId } =
    await req.body;
  console.log(req.body);
  try {
    const patientHistory = new PatientHistory({
      recordId,
      title,
      date,
      description,
      doctor,
      symptom,
      presId,
    });
    const newPatientHistory = await patientHistory.save();
    res.status(201).json(newPatientHistory);
  } catch (error) {
    console.error("Error entering patient history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPatientsHistory,
  enterData,
};
