const SymptomMedicalIncident = require('../models/medicalIncidentTestModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createSymptomMedicalIncident = async (req, res) => {
  const { incidentType, date,SymptomDescription,Frequency,severity,duration} = req.body;
  
  try {
    // Create a new test medical incident document
    const symptomMedicalIncident = await SymptomMedicalIncident.create({ incidentType, date ,SymptomDescription,Frequency,severity,duration});

    // Respond with the created test medical incident
    res.status(200).json(symptomMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSymptomMedicalIncident
};
