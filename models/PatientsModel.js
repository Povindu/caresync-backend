const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    blood: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Patient", PatientSchema);
