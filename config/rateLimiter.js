const rateLimit = require('express-rate-limit');

const metricsLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.',
});

module.exports = metricsLimiter;
