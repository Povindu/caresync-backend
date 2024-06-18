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
      type: Schema.Types.ObjectId,
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
    link: {
      type: String,

      trim: true, // Trims whitespace from the value
      validate: {
        validator: function (v) {
          // This regular expression allows URLs with or without protocols
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Basic URL validation
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PrescriptionIncident",
  PrescriptionIncidentSchema
);
