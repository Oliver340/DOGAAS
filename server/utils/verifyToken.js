const jwt = require("jsonwebtoken");

const tokenKey = require('../utils/generateTokenKey');

// middleware, decrypts the token and puts it in req.user
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send(JSON.stringify({ message: "use ya damn token" }));
    }

    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send(JSON.stringify({ message: "Invalid Token" }));
    }

    return next();
};

module.exports = verifyToken;