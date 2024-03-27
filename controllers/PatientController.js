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

const addDocAccess = async (req, res) =>{
  const { id } = req.params;
  console.log(id);
  console.log(req.body.docID);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.docID)) {
    return res.status(404).json({ error: "No such doctor" });
  }

  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { accessDoctors : req.body.docID }
    }
  );
  res.status(200).json(patient);
}

// delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such patient" });
  }

  console.log(id);
  const patient = await Patient.findOneAndDelete({ _id: id });

  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }
  res.status(200).json({ message: "Patient deleted"});
};



module.exports = {
  getPatients,
  getPatient,
  deletePatient,
  addDocAccess,
};
