const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const breathingTestSchema = new Schema(
  {
    pID:{
      type:String,
      required:true,
    },
    date: {
      type: String,
      required: true,
    },
    systime: {
      type: String,
      required:true,
    },
    stopwatchTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("breathingTestResult", breathingTestSchema);
