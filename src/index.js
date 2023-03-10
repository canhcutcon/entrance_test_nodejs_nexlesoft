dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const http = require("http")
const routers = require("./routers")

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.json({ limit: "50mb" }))

const server = http.createServer(app)
routers(app)

server.listen(port, function () {
    console.log("Server start in http://localhost:" + port)
})

module.exports = app
