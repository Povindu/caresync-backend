const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const DoctorModel = require("../../models/doctor");
const PatientModel = require("../../models/Patient");
const AdminModel = require("../../models/PortalAdminModel");

const { generateAccessToken } = require("./generateAccessToken");

const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("decoded", decoded);

    if (!decoded) {
      throw new Error("Invalid refresh token");
    }

    if (decoded.roles === "doctor") {
      const Doctor = await DoctorModel.findOne({ _id: decoded._id });
      if (!Doctor) {
        throw new Error("Invalid refresh token, Cannot find related Doctor");
      }
    }
    if (decoded.roles === "patient") {
      const Patient = await PatientModel.findOne({ _id: decoded._id });
      if (!Patient) {
        throw new Error("Invalid refresh token, Cannot find related Patient");
      }
    }
    if (decoded.roles === "admin") {
      const Admin = await AdminModel.findOne({ _id: decoded._id });
      console.log("Admin", Admin);
      if (!Admin) {
        throw new Error("Invalid refresh token, Cannot find related Admin");
      }
    }

    const accessToken = generateAccessToken({
      _id: decoded._id,
      roles: decoded.roles,
      fName: decoded.fName,
      lName: decoded.lName,
    });

    return { accessToken };
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return null;
  }
};

module.exports = { refreshAccessToken };
