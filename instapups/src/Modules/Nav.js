import React from "react";
import { Link } from "react-router-dom";
import "../sass/Modules/Nav.modules.scss";

const Nav = () => {
  return (
    <div className="navbar">
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
    </div>
  );
};

export default Nav;
