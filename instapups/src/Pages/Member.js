import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../Modules/Post";
import "../sass/Pages/Member.pages.scss";
import Sidemenu from "../Modules/Sidemenu";
import UserCard from "../Modules/OtherUsersProfileCard";
import LoggedInUserCard from "../Modules/LoggedInUserProfileCard";
import Footer from "../Modules/Footer";
import Popup from "../Modules/Popup";

const Member = () => {
  const { id } = useParams();
  const [member, setMember] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);
  const [followMessage, setFollowMessage] = useState();
  const [gotPosts, setGotPosts] = useState(true);
  const [postMessage, setPostMessage] = useState();
  const [loaded, setLoaded] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:5051/members/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await response.json();
      if (response.status !== 200) {
        if (response.status === 401) {
          window.location.href = "/";
        }
        setPopup(true);
        return;
      }

      setPosts(res.posts);
      setMember(res.user);
      setLoggedInUser(res.loggedInUser);

      if (res.followMessage) {
        setIsFollowing(false);
        setFollowMessage(res.followMessage);
      }

      if (res.postMessage) {
        setGotPosts(false);
        setPostMessage(res.postMessage);
        setPosts(res.posts);
      }

      setLoaded(true);
    };
    getMember();
  }, [id]);

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <>
      {popup ? <Popup onClose={closePopup} /> : null}
      <div className="memberPageWrapper">
        <div className="filler-div"></div>
        <Sidemenu />

        <div className="memberPage">
          {member.username === loggedInUser.username ? (
            <LoggedInUserCard loggedInUser={loggedInUser} />
          ) : (
            <UserCard member={member} following={isFollowing} posts={posts} />
          )}
          {loaded ? (
            !isFollowing ? (
              <p> {followMessage} </p>
            ) : !gotPosts ? (
              <p> {postMessage} </p>
            ) : (
              posts.map((post) => <Post key={post._id} {...post} />)
            )
          ) : (
            "Loading..."
          )}
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default Member;
