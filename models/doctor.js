const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    doctorID: {
      type: Number,
      required: true,
    },

    //Specialization
    spec: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Doctor", DoctorSchema)