const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your actual secret key
        if (!decoded) {

            return    res.status(401).json({
                message: 'Token is not valid or expired',
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateJWT;
