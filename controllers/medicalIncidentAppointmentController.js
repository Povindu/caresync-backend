const AppointmentMedicalIncident = require('../models/medicalIncidentTestModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createAppointmentMedicalIncident = async (req, res) => {
  const { incidentType, date,purpose,health_pro_name,health_pro_contact} = req.body;
  
  try {
    // Create a new test medical incident document
    const appointmentMedicalIncident = await AppointmentMedicalIncident.create({ incidentType, date ,purpose,health_pro_name,health_pro_contact});

    // Respond with the created test medical incident
    res.status(200).json(appointmentMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createAppointmentMedicalIncident
};
