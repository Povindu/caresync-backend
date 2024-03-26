// const { Router } = require("express");
// const UserToken = require("../models/PatientToken");
// const verifyRefreshToken = require("../utils/verifyRefreshToken");
// // import { create } from "../models/Patient";
// const jwt = require("jsonwebtoken");
// const refreshTokenBodyValidation  = require("../utils/verifyRefreshToken");

// const router = Router();

// router.post("/", async (req, res) => {


//   const {error}  = refreshTokenBodyValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //Verify the refresh token
//   //If the refresh token is valid, create a new access token
//   //Send the new access token to the client
//   //If the refresh token is invalid, send an error message to the client
  
//   verifyRefreshToken(req.body.refreshToken)
//     .then(({ tokenDetails }) => {
//       const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
//       //Create a new access token
//       const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
//         expiresIn: "2d",
//       });

//       res.send({ accessToken });
//     })
//     .catch((err) => {
//       console.error("Error verifying refresh token:", err);
//       res.status(401).send("Invalid refresh token");
//     });
// });

// router.delete("/", async (req, res) => {
//     try{
//         const { error } = refreshTokenBodyValidation(req.body);
//         if (error) return res.status(400).send(error.details[0].message);
//         const { refreshToken } = req.body;
//         const userToken = await UserToken.findOne({ token: refreshToken });
//         if (!userToken) return res.status(401).send("Logout failed. Refresh token not found.");
//         await userToken.remove();
//         res.send("Logout successful");

       
    

//     }catch(err){
//         console.error("Error deleting refresh token:", err);
//         res.status(500).send("Internal server error");
//     }
// });

// module.exports = router;