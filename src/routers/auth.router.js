const router = require("express").Router()
const authController = require("../controllers/auth.controller")
const middleware = require("../middlewares/authenJWT.middleware").api

router.post("/sign-up", authController.signUp)
router.post("/sign-in", authController.signIn)
router.post("/refresh-token", authController.refreshToken)
router.post("/sign-out", middleware, authController.signOut)

module.exports = router
