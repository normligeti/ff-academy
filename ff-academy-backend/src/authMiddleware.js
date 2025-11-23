const jwt = require("jsonwebtoken");

const jwtSecret = process.env.AUTH_JWT_SECRET || "secretx";  // Add fallback if env is undefined

const attachUserInfo = async (req, res, next) => {
    const token = req.cookies?.auth_token;
    
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
       
        req.userInfo = decoded;
        next();
    } catch (err) {
        res.status(401).json({ errorMessage: 'Invalid token' });
    }
};

module.exports = { attachUserInfo };
