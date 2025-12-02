const jwt = require("jsonwebtoken");

const jwtSecret = process.env.AUTH_JWT_SECRET || "secretx";  // Add fallback if env is undefined

const attachUserInfo = async (req, res, next) => {
    // httponly cookie
    // const token = req.cookies?.auth_token;
    
    // if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    // try {
    //     const decoded = jwt.verify(token, jwtSecret);
       
    //     req.userInfo = decoded;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ errorMessage: 'Invalid token' });
    // }



    // bearer token
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'Missing auth header' });
    
    const token = header.split(' ')[1]; // "Bearer <token>"

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userInfo = decoded; // attach user info
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { attachUserInfo };
