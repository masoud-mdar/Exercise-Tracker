const User = require("../db/model")

const addHandler = (req, res) => {

    const checkValid = (date) => {

        if (date instanceof Date && isNaN(date)) {
            return false
        } else {
            return true
        }
    }

    const testDate = (req.body.information.date) ? (new Date(req.body.information.date)) : ""
  
    const {userId, description} = req.body.information
    const duration = parseInt(req.body.information.duration)
    const date = (req.body.information.date && checkValid(testDate)) ? new Date(req.body.information.date).toDateString() : new Date().toDateString()
    
  
    if (!userId) {
        res.send({"error": "userId is required"})
    } else if (!description){
        res.send({"error": "description is required"})
    } else if (/[a-z]/i.test(req.body.information.duration)) {
        res.send({"error": "invalid duration"})
    } else if (!duration){
        res.send({"error": "duration is required"})
    } else {

        // Modifying the document in a classic way to be sure that we don't make a mistake while updating the "log" property
        User.findById({_id: userId}, (err, user) => {

            if (err) {
                console.error(err)
                res.send({"error": "Internal error. Please try again later or double check the id..."})
            } else {
                if (user) {
                    const obj = {"username": user.username, "_id": userId, "description": description, "duration": duration, "date": date}
                    const logObj = {"description": description, "duration": duration, "date": date}
                    user.log.push(logObj)
          
                    user.save((err, updatedDoc) => {

                        if (err) {
                            console.error(err)
                            res.send({"error": "Internal error. Please try again later"})
                        } else {
                            res.json(obj)
                        }
                    })
                
                } else {
                    res.send({"error": "User not found..."})
                }
            }

        })
    }
}

module.exports = addHandler