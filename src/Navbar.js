import React from "react";
import home from "./MianPages/components/home-icon.svg";

function Navbar(props) {
  let x;
  let y;
  for (x = 0; x < props.teammembers.length; x++) {
    if (props.teammembers[x].email === props.user.email) {
      y = props.teammembers[x].name;
      break;
    }
    console.log(x, props.teammembers[x]);
  }

  return (
    <div className="navbar-wrap">
      <img
        className="home"
        src={home}
        onClick={props.mainClick}
        alt="Logo"
        style={{ display: !props.status[0] && "none" }}
        name="home"
      />
      <span className="name">Welcome, {y}!</span>
      <button className="logout" onClick={props.logout}>
        logout
      </button>
      <button
        className="nav add-qn"
        style={{ display: !props.status[1] && "none" }}
        name="reset"
        onClick={props.mainClick}
      >
        Reset Session
      </button>
      <button
        className="nav start-game"
        style={{ display: !props.status[2] && "none" }}
        name="addqn"
        onClick={props.mainClick}
      >
        Edit
      </button>
    </div>
  );
}

export default Navbar;
