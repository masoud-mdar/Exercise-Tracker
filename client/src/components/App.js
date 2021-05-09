import React, {useState} from "react"
import axios from "axios"
import Nav from "./Nav"
import New from "./New"
import All from "./All"
import Add from "./Add"
import Log from "./Log"
import Result from "./Result"

const BASE_URL = "http://localhost:5000"

const App = () => {
    const [result, setResult] = useState([])

    const [newUserInput, setNewUserInput] = useState("")

    const [idInput, setIdInput] = useState("")
    const [descInput, setDescInput] = useState("")
    const [durInput, setDurInput] = useState("")
    const [dateInput, setDateInput] = useState("")

    const [logIdInput, setLogIdInput] = useState("")
    const [fromInput, setFromInput] = useState("")
    const [toInput, setToInput] = useState("")
    const [limitInput, setLimitInput] = useState("")

    const [isNew, setIsNew] = useState(true)
    const [isAll, setIsAll] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [isLog, setIsLog] = useState(false)

    const [which, setWich] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (Event) => {
        const {name, value} = Event.target
        switch (name) {
            case "newUserInput":
                setNewUserInput(value)
                break
            case "idInput":
                setIdInput(value)
                break
            case "descInput":
                setDescInput(value)
                break
            case "durInput":
                setDurInput(value)
                break
            case "dateInput":
                setDateInput(value)
                break
            case "logIdInput":
                setLogIdInput(value)
                break
            case "fromInput":
                setFromInput(value)
                break
            case "toInput":
                setToInput(value)
                break
            default:
                setLimitInput(value)
                break
        }
    }

    const handleSubmit = (Event) => {
        const {name} = Event.target

        if (name === "newUser") {
            setIsLoading(true)
            axios.post(`${BASE_URL}/api/exercise/new-user`, {username: newUserInput}).then((response) => {

                const {data} = response

                if (data.hasOwnProperty("error")) {
                    setResult([`Error: ${data.error}`])

                } else {

                    setResult(["user added successfully!", `username: ${data.username}`, `id: ${data._id}`])
                    cleaner()
                }                
                setIsLoading(false)
            })
        } else if (name === "all") {

            setIsLoading(true)

            axios.get(`${BASE_URL}/api/exercise/users`).then((response) => {
                const {data} = response

                if (data.hasOwnProperty("error") || !data) {
                    setResult([`Error: ${data ? data.error : "internal error. Please try again later..."}`])

                } else {
                    let array = data.map(item => {
                        return (`username: ${item.username}, id: ${item._id}`)
                    })

                    setResult(array)
                    cleaner()
                }              
                setIsLoading(false)
            })

        } else if (name === "add") {

            setIsLoading(true)

            const information = {"userId": idInput, "description": descInput, "duration": durInput, "date": dateInput}

            axios.post(`${BASE_URL}/api/exercise/add`, {information}).then((response) => {
                const {data} = response

                if (data.hasOwnProperty("error") || !data) {

                    setResult([`Error: ${data ? data.error : "internal error. Please try again later..."}`])

                } else {

                    let array = [`username: ${data.username}, id: ${data._id}, description: ${data.description}, duration: ${data.duration}, date: ${data.date}`]
                    

                    array.unshift("User's log successfully updated!")

                    setResult(array)
                    cleaner()
                }
                setIsLoading(false)
            })

        } else if (name === "log") {

            setIsLoading(true)

            const url = `${BASE_URL}/api/exercise/log?initUserId=${logIdInput}&initFrom=${fromInput}&initTo=${toInput}&initLimit=${limitInput}`

            axios.get(url).then((response) => {

                const {data} = response

                if (data.hasOwnProperty("error") || !data) {

                    setResult([`Error: ${data ? data.error : "internal error. Please try again later..."}`])

                } else {

                    let array = []

                    array.push(`username: ${data.username}`)
                    array.push(`id: ${data._id}`)
                    array.push(`count: ${data.count}`)
                    
                    if (data.log.length) {

                        array.push("log:")
                        data.log.forEach( (element, d) => {
                            if (element) {
                                let n = d+1
                                array.push(`${n}. description: ${element.description}, duration: ${element.duration}, date: ${element.date}`)
                            }

                        })
                    }
                    setResult(array)
                    cleaner()
                }
                setIsLoading(false)
            })            
        }
    }

    const changer = (Event) => {
        const {name} = Event.target

        setResult([])

        switch (name) {
            case "all":
                setIsAll(true)
                setIsNew(false)
                setIsAdd(false)
                setIsLog(false)
                setWich("all")
                break
            case "add":
                setIsAll(false)
                setIsNew(false)
                setIsAdd(true)
                setIsLog(false)
                setWich("add")
                break
            case "log":
                setIsAll(false)
                setIsNew(false)
                setIsAdd(false)
                setIsLog(true)
                setWich("log")
                break
            default:
                setIsAll(false)
                setIsNew(true)
                setIsAdd(false)
                setIsLog(false)
                setWich("new")           
        }
    }

    const cleaner = (Event) => {

        if (Event && Event.target.name === "close") {
            setResult([])
        } else {
            setNewUserInput("")
            setIdInput("")
            setDescInput("")
            setDurInput("")
            setDateInput("")
            setLogIdInput("")
            setFromInput("")
            setToInput("")
            setLimitInput("")
        }
    }

    return (
        <div>
            {
                isLoading ? (

                    <div>
                        <Nav changer={changer} which={which} />
                        <div className="loading"><h1>Loading</h1></div>

                    </div>

                ) : (
                    <div>

                        <Nav changer={changer} which={which} />

                        <div className="container">

                            {
                                isNew ? (

                                    <New data={{handleChange, newUserInput, handleSubmit}} />

                                ) : isAll ? (

                                    <All data={{handleSubmit}} />

                                ) : isAdd ? (

                                    <Add
                                    data={{
                                        handleChange,
                                        handleSubmit,
                                        idInput,
                                        descInput,
                                        durInput,
                                        dateInput
                                    }}
                                />

                                ) : (

                                    <Log
                                    data={{
                                        handleChange,
                                        handleSubmit,
                                        logIdInput,
                                        fromInput,
                                        toInput,
                                        limitInput
                                    }}
                                />

                                )
                            }

                            {result.length ? (
                                <Result 
                                cleaner={cleaner} 
                                result={result} 
                                log={{isLog: isLog, isNew: isNew, isAdd: isAdd, isAll: isAll}} 
                                />

                            ) : (
                                <div></div>
                            )
                            }
                                
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default App