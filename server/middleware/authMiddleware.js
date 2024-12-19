const { verifyToken } = require("../src/user/userService");

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (role !== requiredRole) {
            return res.status(403).json({ status: false, message: 'Access Denied' });
        }
        next();
    };
};

// Middleware to verify token
const verifyTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: false, message: 'Authorization token is missing' });
        }

        const decoded = verifyToken(token);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (err) {
        res.status(401).json({ status: false, message: 'Invalid or expired token' });
    }
};


module.exports = { verifyTokenMiddleware, roleMiddleware };