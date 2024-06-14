const PrescriptionMedicalIncident = require("../../models/medicalIncidentTestModel");
const mongoose = require("mongoose");

const createPrescriptionMedicalIncident = async (req, res) => {
  try {
    const {
      recordName,
      recordDescription,
      incidentType,
      date,
      pres_note,
      link,
    } = req.body;

    // Check if a document with the provided recordName and recordDescription exists
    let medicalIncident = await PrescriptionMedicalIncident.findOne({
      recordName,
      recordDescription,
    });

    if (!medicalIncident) {
      // If no document is found, create a new one
      medicalIncident = new PrescriptionMedicalIncident({
        recordName,
        recordDescription,
        incident: [
          {
            incidentType,
            date,
            pres_note,
            link,
          },
        ],
      });
    }

    // Push the new incident into the incident array
    medicalIncident.incident.push({
      incidentType,
      date,
      pres_note,
      link,
    });

    // Save the updated document
    await medicalIncident.save();

    res.status(200).json({ message: "prescription saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetPrescriptionMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching prescriptions");
    const Prescriptions = await PrescriptionMedicalIncident.find({}).sort({
      createdAt: -1,
    });
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Prescriptions);
    res.status(200).json(Prescriptions);
  } catch (error) {
    console.error("Error fetching Prescriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPrescriptionMedicalIncident,
  GetPrescriptionMedicalIncident,
};
