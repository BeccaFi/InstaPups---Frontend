import { useEffect, useState } from "react";
import MemberCardForMembersPage from "../Modules/MemberCardForMembersPage";
import Sidemenu from "../Modules/Sidemenu";
import "../sass/Pages/Members.pages.scss";
import Footer from "../Modules/Footer";
import ErrorPopup from "../Modules/ErrorPopup";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [follows, setFollows] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [ErrorPopup, setErrorPopup] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      const response = await fetch("https://instapups.onrender.com/members", {
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
        setErrorPopup(true);
        return;
      }
      setMembers(res);
      setFilteredMembers(res);
      setFetched(true);
    };

    const getFollows = async () => {
      const response = await fetch("https://instapups.onrender.com/members/follows", {
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
        setErrorPopup(true);
        return;
      }

      setFollows(res);
    };
    getFollows();
    getMembers();
  }, []);

  const filterMembers = (e) => {
    const filter = e.target.value;
    if (filter === "all") {
      setFilteredMembers(members);
    } else if (filter === "following") {
      const filteredMembers = members.filter((member) =>
        follows.map((follow) => follow).includes(member.username)
      );
      setFilteredMembers(filteredMembers);
    } else if (filter === "nonfollowing") {
      const filteredMembers = members.filter(
        (member) => !follows.map((follow) => follow).includes(member.username)
      );
      setFilteredMembers(filteredMembers);
    }
  };

  const closeErrorPopup = () => {
    setErrorPopup(false);
  };

  return (
    <>
      {ErrorPopup ? <ErrorPopup onClose={closeErrorPopup} /> : null}
      <div className="membersWrapper">
        <Sidemenu />
        <div className="filler-div"></div>
        <div>
          <select
            className="members-SelectField"
            onChange={(e) => filterMembers(e)}
          >
            <option value="all">Filter: All</option>
            <option value="following">Following</option>
            <option value="nonfollowing">Not following</option>
          </select>
          <div className="Wrap-for-Membercards">
            {fetched ? (
              filteredMembers.map((member) => (
                <MemberCardForMembersPage key={member._id} {...member} />
              ))
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default Members;
