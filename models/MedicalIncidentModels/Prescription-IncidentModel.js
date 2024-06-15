const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrescriptionIncidentSchema = new Schema(
  {
    recordID: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
    doctorID: {
      type: Schema.Types.ObjectId || String,
      ref: "Doctor",
    },
    doctorName: {
      type: String,
    },
    PrescriptionDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    link:{
      type: String,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PrescriptionIncident",
  PrescriptionIncidentSchema
);
