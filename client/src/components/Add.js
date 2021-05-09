import React from "react"

const Add = (props) => {
    return (
        <div className="sub-container">
            <input name="idInput" onChange={props.data.handleChange} value={props.data.idInput} placeholder="User id" className="input" ></input>
            <input name="descInput" onChange={props.data.handleChange} value={props.data.descInput} placeholder="Description" className="input" ></input>
            <input name="durInput" onChange={props.data.handleChange} value={props.data.durInput} placeholder="Duration" className="input" ></input>
            <input name="dateInput" onChange={props.data.handleChange} value={props.data.dateInput} placeholder="Date" className="input" ></input>
            <button name="add" onClick={props.data.handleSubmit} className="btn">add to log</button>
        </div>
    )
}

export default Add