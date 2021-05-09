import React from "react"

const Nav = (props) => {
    const style = {"color": "orange", "fontSize": "xx-large"}
    const {which} = props
    return (
        <div className="nav">
            <div className="title">
                <h1>Exercise Tracker</h1>
            </div>
            <div className="btn-wrapper">
                <button className="btn-nav" name="new" onClick={props.changer} style={which === "new" || !which ? style : {}}>New User</button>
                <button className="btn-nav" name="add" onClick={props.changer} style={which === "add" ? style : {}}>Add Exercise</button>
                <button className="btn-nav" name="all" onClick={props.changer} style={which === "all" ? style : {}}>All Users</button>
                <button className="btn-nav" name="log" onClick={props.changer} style={which === "log" ? style : {}}>Logs</button>
            </div>
        </div>
    )
}

export default Nav