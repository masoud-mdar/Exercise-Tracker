const User = require("../db/model")

const newUserHandler = (req, res) => {
    const userName = req.body.username
    
    User.findOne({username: userName}, (err, doc) => {
      if (doc) {
        res.json({"error": "User already exists"})
      } else {
        const gens = new User({username: userName})
        gens.save((err, gens) => {
          if (err) {
              console.error(err)
              res.send({"error": "Internal error. Please try again later"})

            } else {
                res.json({"username": gens.username, "_id": gens._id})
            }
        })
      }
    })
}

module.exports = newUserHandler