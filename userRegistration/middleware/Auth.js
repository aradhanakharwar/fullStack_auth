const jwt = require("jsonwebtoken");
const secretKey = require('../config/config');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["access-token"];
    if (!token) {
        res.status(404).send({ msg: 'Token is required for authentication.' })
    };
    try {
        const decode = jwt.verify(token, secretKey.secret_jwt)
        req.body = decode;
    } catch {
        res.status(200).send({ msg: 'Invalid token accessed.' })
    }
    next()
};

module.exports = verifyToken;