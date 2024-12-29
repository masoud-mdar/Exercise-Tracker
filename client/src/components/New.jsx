import React from "react"

const New = (props) => {
    return (
        <div className="sub-container">
            <input name="newUserInput" onChange={props.data.handleChange} value={props.data.newUserInput} placeholder="Enter a new username..." className="input"></input>
            <button name="newUser" onClick={props.data.handleSubmit} className="btn">submit</button>
        </div>
    )
}

export default New