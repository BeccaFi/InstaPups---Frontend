import React from "react";
import { Link } from "react-router-dom";
import "../sass/Modules/Nav.modules.scss";
import Logout from "./Logout";

const Nav = () => {
  return (
    <div className="navbar">
      <h1>Nav</h1>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/members">
        <button>Members</button>
      </Link>
      <Logout />
    </div>
  );
};

export default Nav;
