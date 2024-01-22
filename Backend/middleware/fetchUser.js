var jwt = require('jsonwebtoken');

const jwt_Secret = "HassaisGoodBy";

const fetchUser = (req, res, next) => {
    // Get User from jwt token from id 
    const Token = req.header('auth-token');
    if (!Token) {
        return res.status(401).json({ error: "User authentication token not provided" });
    }
    try {
        const data = jwt.verify(Token, jwt_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
module.exports = fetchUser;
