const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stepCountSchema = new Schema(
  {
    pID:{
      type:String,
      required:true,
    },
    date: {
      type: String,
      required: true,
    },
    stopwatchTime: {
      type: String,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stepCounterTestResult", stepCountSchema);
