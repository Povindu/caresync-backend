const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientHistorySchema = new Schema(
  {
    patientId:{
      type: String,

    },
    recordId: {
      type: String,
 
    },
    title: {
      type: String,

    },
    date: {
      type: String,

    },
    description: {
      type: String,

    },
    doctor: {
      type: String,

    },
    symptom: {
      type: String,

    },
    presId: {
      type: String,

    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PatientHistory", PatientHistorySchema);
