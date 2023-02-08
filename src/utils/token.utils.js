const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const MyError = require('../exception/myerror');

const tokenUtils = {
    generateToken: async (data, tokenLife) => {
        if (!data) return null;
        console.log("🚀 ~ file: token.utils.js:17 ~ generateToken: ~ process.env.JWT_KEY", process.env.JWT_KEY)

        return await jwt.sign(
            { ...data, createdAt: new Date() },
            process.env.JWT_KEY,
            {
                expiresIn: tokenLife,
            }
        );
    },

    verifyToken: async (token) => {
        if (!token) return new MyError('Token Invalid');

        return await jwt.verify(token, process.env.JWT_KEY);
    },
};

module.exports = tokenUtils;