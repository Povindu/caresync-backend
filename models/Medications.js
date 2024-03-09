const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicationSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    medicalDetails: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", MedicationSchema);
