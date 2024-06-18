const mongoose = require("mongoose");
const { Schema } = mongoose;

const SymptomIncidentSchema = new Schema(
  {
    recordID: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },

    symptomType: {
      type: String,
      required: true,
    },
    symptomDescription: {
      type: String,
      required: true,
    },
    symptomFrequency: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    symptomDuration: {
      type: String,
      required: true,
    },
    appetite: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SymptomIncident", SymptomIncidentSchema);
