import React from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard'

const Result = (props) => {

    return (
        <div className="result">
        <button name="close" onClick={props.cleaner} className="close">X</button>
        <ul>
        {props.result.map(item =>{
            return (
                <li key={Math.random()*Math.random()}>
                    <div className="res">
                        <h3>{item}</h3>
                        {props.log.isNew || props.log.isAll ? (

                            <CopyToClipboard text={item}>
                                <span>copy</span>
                            </CopyToClipboard>
                        ) : (
                            <div></div>
                        )}

                    </div>
                    
                
                </li>
            )
        })}
        </ul>
    </div>
    )
}

export default Result