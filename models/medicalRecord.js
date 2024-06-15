const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicalRecordSchema = new Schema(
  {
    recordName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    incidents: {
      testIncidents: [
        {
          type: Schema.Types.ObjectId,
          ref: "TestIncident",
          default: [],
        },
      ],
      symptomIncidents: [
        {
          type: Schema.Types.ObjectId,
          ref: "SymptomIncident",
          default: [],
        },
      ],
      medicationIncidents: [
        {
          type: Schema.Types.ObjectId,
          ref: "MedicationIncident",
          default: [],
        },
      ],
      appointmentIncidents: [
        {
          type: Schema.Types.ObjectId,
          ref: "AppointmentIncident",
          default: [],
        },
      ],
      prescriptionIncidents: [
        {
          type: Schema.Types.ObjectId,
          ref: "PrescriptionIncident",
          default: [],
        },
      ],
    },
    patientID: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    recordDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
