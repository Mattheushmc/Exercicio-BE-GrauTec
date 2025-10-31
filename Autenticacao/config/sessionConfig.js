const session = require('express-session');
require('dotenv').config();

module.exports = session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'segredodefallback',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2
    }
});
