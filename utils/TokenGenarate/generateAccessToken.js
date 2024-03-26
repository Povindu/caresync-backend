// const UserToken = require("../models/UserToken");
// const jwt = require("jsonwebtoken");

// const generateAccessTokenPatient = async (user) => {
//   try {
//     // const payload = {
//     //   _id: user._id,
//     //   roles: user.roles,
//     //   fName: user.fName,
//     //   lName: user.lName,
//     // };
//     // const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//     //   expiresIn: "2d",
//     // });

//     // // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     // //   expiresIn: "7d",
//     // // });

//     // const userToken = await UserToken.findOne({ userId: user._id });
//     // if (userToken) await userToken.remove();

//     // await new UserToken({ userId: user._id, token: refreshToken }).save();

//     // return { accessToken };

//     const generateAccessToken = (payload) => {
//       return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "2d",
//       });
//     };


//   } catch (err) {
//     console.error("Error generating tokens:", err);
//     return null;
//   }
// };

// module.exports = { generateAccessTokenPatient };

const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    console.log("payload", payload);

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600",
    });
};

module.exports = { generateAccessToken };
