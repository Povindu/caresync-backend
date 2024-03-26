const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const breathingTestSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    stopwatchTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("breathingTestResult", breathingTestSchema);
