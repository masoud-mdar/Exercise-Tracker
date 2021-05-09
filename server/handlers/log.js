const mongoose = require("mongoose")
const User = require("../db/model")

const logHandler = (req, res) => {

    const {initUserId, initFrom, initTo, initLimit} = req.query

    const isValid = mongoose.Types.ObjectId.isValid(initUserId)

    if (!initUserId || !isValid) {

        res.send({"error": "Please enter a valid user Id..."})

    } else if (initLimit && isNaN(parseInt(initLimit))) {

        res.send({"error": "Limit should be a valid number..."})

    } else {

        const checkValid = (date) => {

            if (date instanceof Date && isNaN(date)) {
                return false
            } else {
                return true
            }
        }

        if (initFrom && !checkValid(new Date(initFrom))) {

            res.send({"error": "Please enter a valid date or let it blank..."})

        } else if (initTo && !checkValid(new Date(initTo))) {

            res.send({"error": "Please enter a valid date or let it blank..."})

        } else {

            const userId = initUserId

            const from = !initFrom ? "1900" : initFrom

            const to = !initTo ? "2100" : initTo

            const limit = !initLimit ? "1000" : initLimit


            User.findById({_id: userId}, (err, user) => {

                if (err) {
    
                    console.error(err)
                    res.send({"error": "Internal error. Please try again later"})
                
                } else if (user) {

                    const minDate = new Date(from)
                    const maxDate = new Date(to)
            
                    let filteredLog = user.log.map(item =>{
                        const itemDate = new Date(item.date)
                        if (itemDate < maxDate && itemDate > minDate){
                            return item
                        }
                    })
      
                    let intLimit = parseInt(limit)

                    if (intLimit > filteredLog.length) {
                        intLimit = filteredLog.length
                    }

                    const limitedLog = []
                    for (let i=0; i<intLimit; i++) {
                        limitedLog.push(filteredLog[i])
                    }

                    let obj = {"_id": userId, "username": user.username, "count": user.log.length, "log": limitedLog}

                    res.json(obj)
    
          
                } else {
                    res.send({"error": "User not found..."})
                }  
            })

        }
    }
}

module.exports = logHandler