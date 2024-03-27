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
