const TestMedicalIncident = require('../models/medicalIncidentTestModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createTestMedicalIncident = async (req, res) => {
  const { RecName,incidentType, date,testType, testProvider} = req.body;
  
  try {
    // Create a new test medical incident document
    const testMedicalIncident = await TestMedicalIncident.create({RecName, incidentType, date ,testType,testProvider});

    // Respond with the created test medical incident
    res.status(200).json(testMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTestMedicalIncident
};
