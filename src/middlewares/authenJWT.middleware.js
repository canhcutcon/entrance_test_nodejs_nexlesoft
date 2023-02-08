const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../model/users.model")
const MyError = require("../exception/myerror")
const tokenUtils = require("../utils/token.utils")

module.exports = {
    async api(req, res, next) {
        try {
            // get token from header
            const token = req.headers.authorization || req.headers['authorization']

            if (!token) throw new MyError("Token is not provided")

            // get userInfo from token
            const payload = await tokenUtils.verifyToken(token)
            const { userId } = payload
            const user = await User.getUserById(userId)

            if (!user) { throw new MyError("User is disable!") }

            req.auth = payload

            next()
        } catch (err) {
            console.log(err.name + ": " + err.message)
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                action: err.name === "Error" ? "logout" : "refresh"
            })
        }
    }
}
