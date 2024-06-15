const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const weightSchema = new mongoose.Schema({
  weight: String,
  date: { type: Date, default: Date.now },
});
const userSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      default: "",
    },
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
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    height: {
      type: String,
      default: "0",
    },
    blood: {
      type: String,
    },
    medicalRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord",
      },
    ],
    accessDoctors: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      default: "patient",
    },

    birthday: {
      type: String,
    },
    weight: {
      type: String,
      default: "0",
    },
    pastWeights: {
      type: [weightSchema], // Array to store past weights with dates
      default: [],
    },
    address: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },

    testResultLinks: {
      type: Array,
      default: [],
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordOTPExpires: {
      type: Date,
    },
    emailVerificationOTP: {
      type: String,
    },
    emailVerificationExpires: {
      type: Date,
    },
    patientVerification: {
      type: Boolean,
      default: false,
    },
    profileImage: { type: String },
  },
  { timestamps: true }
);
// Hash the password before saving the user model
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
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

module.exports = mongoose.model("Patient", userSchema);
