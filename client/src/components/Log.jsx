import React from "react"

const Log = (props) => {
    return (
        <div className="sub-container">
            <input name="logIdInput" onChange={props.data.handleChange} value={props.data.logIdInput} placeholder="User id" className="input" ></input>
            <input name="fromInput" onChange={props.data.handleChange} value={props.data.fromInput} placeholder="From" className="input" ></input>
            <input name="toInput" onChange={props.data.handleChange} value={props.data.toInput} placeholder="To" className="input" ></input>
            <input name="limitInput" onChange={props.data.handleChange} value={props.data.limitInput} placeholder="How many logs?" className="input" ></input>
            <button name="log" onClick={props.data.handleSubmit} className="btn">show me user's complete log</button>
        </div>
    )
}

export default Log