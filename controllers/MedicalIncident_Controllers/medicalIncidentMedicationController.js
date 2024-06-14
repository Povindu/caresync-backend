const MedicationMedicalIncident = require("../../models/medicalIncidentTestModel");
const mongoose = require("mongoose");

const createMedicationMedicalIncident = async (req, res) => {
  try {
    const {
      recordName,
      recordDescription,
      incidentType,
      date,
      medi_name,
      medi_dosage,
      medi_Frequency,
    } = req.body;

    // Check if a document with the provided recordName and recordDescription exists
    let medicalIncident = await MedicationMedicalIncident.findOne({
      recordName,
      recordDescription,
    });

    if (!medicalIncident) {
      // If no document is found, create a new one
      medicalIncident = new MedicationMedicalIncident({
        recordName,
        recordDescription,
        incident: [
          {
            incidentType,
            date,
            medi_name,
            medi_dosage,
            medi_Frequency,
          },
        ],
      });
    }

    // Push the new incident into the incident array
    medicalIncident.incident.push({
      incidentType,
      date,
      medi_name,
      medi_dosage,
      medi_Frequency,
    });

    // Save the updated document
    await medicalIncident.save();

    res.status(200).json({ message: "Medications saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetMedicationMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching medications");
    const Medications = await MedicationMedicalIncident.find({}).sort({
      createdAt: -1,
    });
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Medications);
    res.status(200).json(Medications);
  } catch (error) {
    console.error("Error fetching medications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createMedicationMedicalIncident,
  GetMedicationMedicalIncident,
};
