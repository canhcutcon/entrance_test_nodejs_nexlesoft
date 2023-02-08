const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const tokenUtils = {
    generateToken: async (data, tokenLife) => {
        if (!data) return null;

        return await jwt.sign(
            { ...data, createdAt: new Date() },
            process.env.JWT_KEY,
            {
                expiresIn: tokenLife,
            }
        );
    },

    verifyToken: async (token) => {
        if (!token) return new Error('Token invalid');

        return await expressJwt({ secret: process.env.JWT_KEY });
    },
};

module.exports = tokenUtils;