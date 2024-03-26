const jwt = require("jsonwebtoken");
const doctor = require("../../models/doctor");

const generateRefreshToken = async (payload) => {
  console.log("payload", payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  let updatedDoctor;

  if (payload.roles === "doctor") {
    updatedDoctor = await doctor.findOneAndUpdate(
      { doctorId: payload._id },
      { token: refreshToken },
      { new: true, upsert: true }
    );
  }

  let updatedPatient;

  if (payload.roles === "patient") {
    updatedPatient = await patient.findOneAndUpdate(
      { patientId: payload._id },
      { token: refreshToken },
      { new: true, upsert: true }
    );
  }

  console.log(refreshToken);

  return refreshToken;
 
};

module.exports = { generateRefreshToken };
