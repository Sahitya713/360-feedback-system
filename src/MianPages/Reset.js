import React from "react"

function Reset(props) {
    return(
        <div>
            <h1 className = "end">Do you wish to confirm to reset the feedback session. By doing so, you will lose all the current results and all team members will be allowed to redo the feedback.</h1>
            <div className= "reset-wrap">
                <button className = "reset" name = "resetcfm" onClick={props.mainClick}>Reset</button>
                <button className = "go-back" name = "home" onClick={props.mainClick}>Go Back</button>
            </div>
            
        
        </div>
    )
}

export default Reset