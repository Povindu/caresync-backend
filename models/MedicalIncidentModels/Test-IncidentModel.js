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
      // trim: true, // Trims whitespace from the value
      // validate: {
      //   validator: function (v) {
      //     // This regular expression allows URLs with or without protocols
      //     return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Basic URL validation
      //   },
      //   message: props => `${props.value} is not a valid URL!`
      // }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestIncident", TestIncidentSchema);
