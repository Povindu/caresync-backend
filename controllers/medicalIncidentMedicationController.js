const MedicationMedicalIncident = require('../models/medicalIncidentTestModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createMedicationMedicalIncident = async (req, res) => {
  const { incidentType, date,medi_name,dosage,medi_Frequency} = req.body;
  
  try {
    // Create a new test medical incident document
    const medicationMedicalIncident = await MedicationMedicalIncident.create({ incidentType, date ,medi_name,dosage,medi_Frequency});

    // Respond with the created test medical incident
    res.status(200).json(medicationMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMedicationMedicalIncident
};
