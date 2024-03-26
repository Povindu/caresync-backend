const mongoose = require("mongoose");
const Patient = require("../models/Patient");

//get all Patients
const getPatients = async (req, res) => {
  const Patients = await Patient.find({}).sort({ createdAt: -1 });
  // console.log(Patients);
  res.status(200).json(Patients);
};

//get a single Patient
const getPatient = async (req, res) => {
  const { patientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res.status(404).json({ error: "No such error" });
  }

  const Patient = await Patient.findById(patientId);

  if (!Patient) {
    return res.status(404).json({ error: "No such patient" });
  }
  res.status(200).json(Patient);
};

module.exports = {
  getPatients,
  getPatient,
};
