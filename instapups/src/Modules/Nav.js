import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../sass/Modules/Nav.modules.scss";
import Logout from "./Logout";
import Login from "./Login";

const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userinfo, setUserinfo] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:5051/auth/navauth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await response.json();
      if (response.status !== 200) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        console.log(res);
        return;
      }
      setIsAuthenticated(true);
      setUserinfo(res);
    };
    checkAuth();
  }, []);

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
      {isAuthenticated ? <Logout /> : <Login />}
      <div className="loggedInUser-container">
        {isAuthenticated ? <img className="ProfilePicture" src={userinfo.profilePic} alt={userinfo.username} /> : null}
        {isAuthenticated ? <p className="loggedInUserName">{userinfo.username}</p> : null}
      </div>
    </div>
  );
};

export default Nav;
