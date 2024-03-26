const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log("Admin Auth", req.userData)
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
