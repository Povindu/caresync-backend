const SymptomMedicalIncident = require("../../models/medicalIncidentTestModel");
const mongoose = require("mongoose");

const createSymptomMedicalIncident = async (req, res) => {
  try {
    const {
      recordName,
      recordDescription,
      incidentType,
      date,
      symptomType,
      symptom_Description,
      symptomFrequency,
      severity,
      SymptomDuration,
      appetite,
      weight,
    } = req.body;

    // Check if a document with the provided recordName and recordDescription exists
    let medicalIncident = await SymptomMedicalIncident.findOne({
      recordName,
      recordDescription,
    });

    if (!medicalIncident) {
      // If no document is found, create a new one
      medicalIncident = new SymptomMedicalIncident({
        recordName,
        recordDescription,
        incident: [
          {
            incidentType,
            date,
            symptomType,
            symptom_Description,
            symptomFrequency,
            severity,
            SymptomDuration,
            appetite,
            weight,
          },
        ],
      });
    }

    // Push the new incident into the incident array
    medicalIncident.incident.push({
      incidentType,
      date,
      symptomType,
      symptom_Description,
      symptomFrequency,
      severity,
      SymptomDuration,
      appetite,
      weight,
    });

    // Save the updated document
    await medicalIncident.save();

    res.status(200).json({ message: "symptoms saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetSymptomMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching symptoms");
    const Symptoms = await SymptomMedicalIncident.find({}).sort({
      createdAt: -1,
    });
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Symptoms);
    res.status(200).json(Symptoms);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSymptomMedicalIncident,
  GetSymptomMedicalIncident,
};
