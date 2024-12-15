const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (role !== requiredRole) {
            return res.status(403).json({ status: false, message: 'Access Denied' });
        }
        next();
    };
};
