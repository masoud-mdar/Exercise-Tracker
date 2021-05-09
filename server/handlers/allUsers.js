const User = require("../db/model")

const allUsersHandler = (req, res) => {

    console.log(new Date("1900"))

    const searchKey = User.find({})

    searchKey.select({"log":0, "__v":0}).exec((err, docs) => {

      if (err) {
          console.error(err)
          res.json({"error": "internal error. Try again later..."})
        } else {
            res.send(docs)
        }
      
    })
}

module.exports = allUsersHandler