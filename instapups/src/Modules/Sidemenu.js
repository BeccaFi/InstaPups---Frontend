import { Link } from "react-router-dom";
import "../sass/Modules/Sidemenu.modules.scss";
import { useEffect, useState } from "react";
import home from "../Media/Icons/pet-bed.png";
import profile from "../Media/Icons/kennel.png";
import members from "../Media/Icons/dog (1).png";

const Sidemenu = () => {
  const [userinfo, setUserinfo] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1217;

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("https://instapups.onrender.com/auth/navauth", {
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

    

  }, []);

  window.addEventListener("resize", () => setWidth(window.innerWidth));

  const homeButton = (
    <>
      {width < breakpoint ? <img className="icons" src={home} alt="Home" /> : "Home"}
    </>
  );

  const profileButton = (
    <>
      {width < breakpoint ? (
        <img className="icons" src={profile} alt="Profile" />
      ) : (
        "Your profile"
      )}
    </>
  );

  const membersButton = (
    <>
      {width < breakpoint ? (
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
