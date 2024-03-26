// const DoctorToken = require("../models/DoctorToken");
// const jwt = require("jsonwebtoken");

// const generateTokens = async (doctor) => {
//     try {
//         const payload = { _id: doctor._id, roles: doctor.roles , fName: doctor.fName, lName: doctor.lName};
//         const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
//         expiresIn: "2d",
//         });

//         const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
//         expiresIn: "7d",
//         });

//         const doctorToken = await DoctorToken.findOne({ doctorId: doctor._id });
//         if (doctorToken) await doctorToken.remove();
    
//         await new DoctorToken({ doctorId: doctor._id, token: refreshToken }).save();
//         return { accessToken, refreshToken };

//     } catch (err) {
//         console.error("Error generating tokens:", err);
//         return null;
//     }
//     };

// module.exports = { generateTokens };
