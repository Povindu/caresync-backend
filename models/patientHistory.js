const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientHistorySchema = new Schema(
  {
    recordId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    symptom: {
      type: String,
      required: true,
    },
    presId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PatientHistory", PatientHistorySchema);
