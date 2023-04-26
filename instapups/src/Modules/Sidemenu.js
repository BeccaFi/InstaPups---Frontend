import { Link } from "react-router-dom";
import "../sass/Modules/Sidemenu.modules.scss";
import { useEffect, useState } from "react";
import home from "../Media/Icons/pet-bed.png";
import profile from "../Media/Icons/kennel.png";
import members from "../Media/Icons/dog (1).png";

const Sidemenu = () => {
  const [userinfo, setUserinfo] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
          return (window.location.href = "/");
        }
        return;
      }
      setUserinfo(res);
    };
    checkAuth();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1217);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const homeButton = (
    <>
      {isSmallScreen ? <img className="icons" src={home} alt="Home" /> : "Home"}
    </>
  );

  const profileButton = (
    <>
      {isSmallScreen ? (
        <img className="icons" src={profile} alt="Profile" />
      ) : (
        "Your profile"
      )}
    </>
  );

  const membersButton = (
    <>
      {isSmallScreen ? (
        <img className="icons" src={members} alt="Members" />
      ) : (
        "Members"
      )}
    </>
  );

  return (
    <div className="sideMenuWrapper">
      <Link to="/home">
        <button>{homeButton}</button>
      </Link>
      <Link to={`/members/${userinfo._id}`}>
        <button>{profileButton}</button>
      </Link>
      <Link to="/members">
        <button>{membersButton}</button>
      </Link>
    </div>
  );
};

export default Sidemenu;
