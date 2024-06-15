const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestIncidentSchema = new Schema(
  {
    recordID: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
    testType: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    testDate: {
      type: Date,
      required: true,
    },
    result: {
      type: String,
    },
    resultLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestIncident", TestIncidentSchema);
