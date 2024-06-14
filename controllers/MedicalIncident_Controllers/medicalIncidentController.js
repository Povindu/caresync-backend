const TestMedicalIncident = require("../../models/medicalIncidentTestModel");
const mongoose = require("mongoose");

const createTestMedicalIncident = async (req, res) => {
  try {
    const {
      recordName,
      recordDescription,
      incidentType,
      date,
      testType,
      testProvider,
    } = req.body;

    // Check if a document with the provided recordName and recordDescription exists
    let medicalIncident = await TestMedicalIncident.findOne({
      recordName,
      recordDescription,
    });

    if (!medicalIncident) {
      // If no document is found, create a new one
      medicalIncident = new TestMedicalIncident({
        recordName,
        recordDescription,
        incident: [
          {
            incidentType,
            date,
            testType,
            testProvider,
          },
        ],
      });
    }

    // Push the new incident into the incident array
    medicalIncident.incident.push({
      incidentType,
      date,
      testType,
      testProvider,
    });

    // Save the updated document
    await medicalIncident.save();

    res.status(200).json({ message: "Incident saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetTestMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching tests");
    const Tests = await TestMedicalIncident.find({}).sort({ createdAt: -1 });
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Tests);
    res.status(200).json(Tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTestMedicalIncident,
  GetTestMedicalIncident,
};
