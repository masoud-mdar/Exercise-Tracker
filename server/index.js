const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const mongoose = require("./db/connection")
const User = require("./db/model")

const newUserHandler = require("./handlers/newUser")
const allUsersHandler = require("./handlers/allUsers")
const addHandler = require("./handlers/add")
const logHandler = require("./handlers/log")

const PORT = process.env.PORT || 5000

const app = express()

const bodyPMiddleware = bodyParser.urlencoded({extended: false})

app.use(bodyPMiddleware)
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    console.log(mongoose.connection.readyState)
    res.send("Hello!")
})

app.post("/api/exercise/new-user", newUserHandler)
app.get("/api/exercise/users", allUsersHandler)
app.post("/api/exercise/add", addHandler)
app.get("/api/exercise/log", logHandler)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

