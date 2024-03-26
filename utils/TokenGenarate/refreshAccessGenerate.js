const jwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");
const { generateAccessToken } = require("./generateAccessToken");
const DoctorToken = require("../../models/DoctorToken");
const roles = require("../../roles");


const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const Doctor = await Doctor.findOne({ _id: decoded._id });

        if (!Doctor || Doctor.token !== refreshToken) {
            throw new Error("Invalid refresh token");
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
