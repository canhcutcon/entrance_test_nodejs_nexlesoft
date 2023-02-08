const authRouter = require("./auth.router")

const router = (app) => {
  app.use("/auth", authRouter)
}

module.exports = router
