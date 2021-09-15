import React from "react"

function Navbar(props) {
    let x;
    let y;
    for (x = 0; x<props.teammembers.length ; x++){
        if (props.teammembers[x].email === props.user.email) {
            y = props.teammembers[x].name
            break;}
        
    }

    return (
        <div className="navbar-wrap">
            <span className = "name">Welcome, {y}!</span>
            <button className="logout" onClick={props.logout}>logout</button>        
        </div>
    )
}

export default Navbar