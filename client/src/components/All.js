import React from "react"

const All = (props) => {
    return (
        <div className="sub-container">
            <button name="all" onClick={props.data.handleSubmit} className="btn">show me all users</button>
        </div>
    )
}

export default All