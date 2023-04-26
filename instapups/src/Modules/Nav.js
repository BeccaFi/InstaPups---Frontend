import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../sass/Modules/Nav.modules.scss";
import Logout from "./Logout";
import Login from "./Login";
import Logo from "../Media/Background/Logo.png";
import LogoText from "../Media/Background/LogoText.png";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userinfo, setUserinfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    
    const checkAuth = async () => {
      if (location.pathname !== "/" && location.pathname !== "/register") {
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
          window.location.href = "/";
          return;
        }
        console.log(res);
        return;
      }
      setIsAuthenticated(true);
      setUserinfo(res);
    }};
    checkAuth();
    
  }, []);


  return (
    <div className="navbar">
      {isAuthenticated ? (location.pathname === "/home" ? <img className="Logo" src={Logo} alt="Logo" onClick= {()=> window.location.reload()}/> : <Link to="/home"> <img className="Logo" src= {Logo} alt= "Logo"/> </Link>) : <img className="Logo" src= {Logo} alt= "Logo"/>}
      <div>
      <img className='LogoText' src={LogoText} />
      {location.pathname === "/" && <Link to="/register">
        <button>Register</button>
      </Link>}
    
    
   
      {isAuthenticated && <Logout />}
      {location.pathname === "/register" && <Login />}
      <div className="loggedInUser-container">
        {isAuthenticated ? <img className="ProfilePicture" src={userinfo.profilePic} alt={userinfo.username} /> : null}
        {isAuthenticated ? <Link to={`/members/${userinfo._id}`} className="loggedInUserName">{userinfo.username}</Link> : null}
      </div>
      </div>
    </div>
  );
};

export default Nav;
