const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log("JWT Token decoded: " + JSON.stringify(decoded));
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Auth failed'
        });
    }
};

//TODO-similar file to check role of user.
//TODO-get user role from jwt.
//TODO-role as input to middleware.
