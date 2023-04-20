import { Link } from "react-router-dom"
import '../sass/Modules/Sidemenu.modules.scss'
import { useEffect, useState } from "react";

const Sidemenu = () => {
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
          return (window.location.href = '/');
        }
        console.log(res);
        return;
      }
      setUserinfo(res);
    };
    checkAuth();
  }, []);

  return (
    <div className='sideMenuWrapper'>
        <Link to="/home"><button>Home</button></Link>
        <Link to={`/members/${userinfo._id}`}><button>Your profile</button></Link>
        <Link to="/members"><button>Members</button></Link>
    </div>
  )
}

export default Sidemenu