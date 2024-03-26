const jwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");
const Patient = require("../../models/Patient");

const generateRefreshToken = async (payload) => {
  console.log("payload", payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  let updatedUser;

  if (payload.roles === "doctor") {
    console.log("doctor");
    updatedUser = await Doctor.findOneAndUpdate(
      { _id: payload._id }, 
      { doctorId: payload._id},
      { refreshToken: refreshToken },
      { new: true }
    );
  }

  if (payload.roles === "patient") {
    console.log("patient");
    updatedUser = await Patient.findOneAndUpdate(
      { _id: payload._id }, 
      { patientId: payload._id},
      { refreshToken: refreshToken },
      { new: true }
    );
  }

  return refreshToken;
};

module.exports = { generateRefreshToken };
