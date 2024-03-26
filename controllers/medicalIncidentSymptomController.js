const SymptomMedicalIncident = require('../models/medicalIncidentSymptomModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createSymptomMedicalIncident = async (req, res) => {
  const { incidentType, date,testType, testProvider} = req.body;
  
  try {
    // Create a new test medical incident document
    const symptomMedicalIncident = await SymptomMedicalIncident.create({ incidentType, date ,testType,testProvider});

    // Respond with the created test medical incident
    res.status(200).json(symptomMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    SymptomMedicalIncident
};
