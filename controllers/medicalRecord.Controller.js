const MedicalRecord = require("../models/medicalRecord");
const Patient = require("../models/Patient");
const mongoose = require("mongoose");

const createMedicalRecord = async (req, res) => {
  try {
    const { recordName, recordDescription, date, patientID } = req.body;

    // *Validation

    // Check if all fields are provided
    if (!recordName || !recordDescription || !date || !patientID) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the patientID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    // Check if a document with the provided recordName and recordDescription exists
    let medicalRecordVal = await MedicalRecord.findOne({
      recordName,
    });

    if (medicalRecordVal) {
      return res.status(400).json({ error: "Record already exists" });
    }

    // If no document is found, create a new one
    medicalRecordVal = new MedicalRecord({
      recordName: recordName,
      description: recordDescription,
      patientID: patientID,
      recordDate: date,
    });

    // Save the updated document
    await medicalRecordVal.save();

    const patient = await Patient.findOneAndUpdate(
      { _id: patientID },
      {
        $addToSet: { medicalRecords: medicalRecordVal._id },
      }
    );

    res.status(200).json({ message: "Medical Record saved successfully" });
  } catch (error) {
    console.error("Error saving medical record:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error : Medical Record Creation" });
  }
};

const getAllMedicalRecords = async (req, res) => {
  try {
    const { patientID } = req.body;

    // Validation
    if (!patientID) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    console.log("Fetching Records");

    const patientRecords = await Patient.findOne({ _id: patientID })
      .populate({
        path: "medicalRecords",
      })
      .select("medicalRecords");

    if (!patientRecords) {
      return res.status(400).json({ error: "No records found" });
    }

    console.log("Records fetched:", patientRecords);
    res.status(200).json({ patientRecords });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
};
