const UserToken = require("../models/PatientToken");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = async ({refreshToken}) => {

    const privateKey = process.env.JWT_REFRESH_KEY;

    console.log(refreshToken);
    
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, privateKey, async (err, tokenDetails) => {
            if (err) {
                reject(err);
            } else {
                const userToken = await UserToken.findOne({ token: refreshToken });
                if (!userToken) {
                    reject("Refresh token not found");
                } else {
                    resolve({ tokenDetails });
                }
            }
        });
    });
};

module.exports = verifyRefreshToken;
