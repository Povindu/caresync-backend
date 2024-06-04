const AppointmentMedicalIncident = require("../../models/medicalIncidentTestModel");
const mongoose = require("mongoose");

const createAppointmentMedicalIncident = async (req, res) => {
  try {
    const {
      recordName,
      recordDescription,
      incidentType,
      date,
      appointmentPurpose,
      health_pro_name,
      health_pro_contact
    } = req.body;

    // Check if a document with the provided recordName and recordDescription exists
    let medicalIncident = await AppointmentMedicalIncident.findOne({
      recordName,
      recordDescription,
    });

    if (!medicalIncident) {
      // If no document is found, create a new one
      medicalIncident = new AppointmentMedicalIncident({
        recordName,
        recordDescription,
        incident: [{
          incidentType,
          date,
          appointmentPurpose,
          health_pro_name,
          health_pro_contact
        }],
      });
    }

    // Push the new incident into the incident array
    medicalIncident.incident.push({
      incidentType,
      date,
      appointmentPurpose,
      health_pro_name,
      health_pro_contact
    });

    // Save the updated document
    await medicalIncident.save();

    res.status(200).json({ message: "appointments saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetAppointmentMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching symptoms");
    const Appointments = await AppointmentMedicalIncident.find({}).sort({ createdAt: -1 });
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Appointments);
    res.status(200).json(Appointments);
  } catch (error) {
    console.error("Error fetching Appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAppointmentMedicalIncident,
  GetAppointmentMedicalIncident
};


