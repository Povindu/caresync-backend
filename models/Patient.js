const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
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
});

patientSchema.pre("save", function (next) {
  const patient = this;
  if (!patient.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(patient.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      patient.password = hash;
      next();
    });
  });
});

patientSchema.methods.comparePassword = function (candidatePassword) {
  const patient = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, patient.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
