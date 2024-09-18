const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fa828b89a321d2301e7a80c837e627ea5dd993292b083dc623520c4b12ac24c5d8fdb3da90a7a1738de7555b49f9ef35f7484c9a2b6dd56cba34fbb1a0fcab9b';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
