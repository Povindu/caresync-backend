const mongoose = require("mongoose");
const DocModel = require("../models/doctor");

//Get all doctors
const getDoctors = async (req, res) => {
  const doctors = await DocModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(doctors);
};

//Get a single doctor by ID
const getDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Doctor" });
  }

  const doc = await DocModel.findById(id);
  if (!doc) {
    return res.status(400).json({ error: "No such Doctor" });
  }

  res.status(200).json(doc);
};

// Create new doctor
// const createDoctor = async (req, res) => {
//   const { name, doctorID, spec } = req.body;

//   // add document to db
//   try {
//     const doc = await DocModel.create({ name, doctorID, spec });
//     res.status(200).json(doc);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// delete a doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such doctor" });
  }

  const doctor = await DocModel.findOneAndDelete({ _id: id });

  if (!doctor) {
    return res.status(400).json({ error: "No such doctor" });
  }
  res.status(200).json({ message: "Doctor deleted"});
};

// update a doctor
const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such doctor" });
  }

  const doctor = await DocModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!doctor) {
    return res.status(400).json({ error: "No such doctor" });
  }
  res.status(200).json(doctor);
};

// Add a patient's profile access to doctor
const addPatientAccess = async (req, res) =>{
  const { id } = req.params;
  console.log(id);
  console.log(req.body.patientID);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such doctor" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.patientID)) {
    return res.status(404).json({ error: "No such patient" });
  }

  const doctor = await DocModel.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { accessPatients : req.body.patientID }
    }
  );

  res.status(200).json(doctor);
}


// Verify a doctor
const verifyDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Doctor" });
  }

  const doctor = await DocModel.findOneAndUpdate(
    { _id: id },
    {
      medicalIdVerify : true,
    }
  );
  console.log(doctor);
  res.status(200).json({message: "Doctor Verified"});

}

module.exports = {
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctor,
  addPatientAccess,
  verifyDoctor,
};
