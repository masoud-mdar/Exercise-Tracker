const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const userSchema = new Schema({
  username: {type: "string", required: true},
  log: ["object"]
})

const User = mongoose.model("User", userSchema)

module.exports = User
