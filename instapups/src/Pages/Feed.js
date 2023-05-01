import CreatePosts from "../Modules/CreatePosts";
import Sidemenu from "../Modules/Sidemenu";
import "../sass/Pages/Feed.pages.scss";
import { useState, useEffect } from "react";
import Post from "../Modules/Post";
import Footer from "../Modules/Footer";
import ErrorPopup from "../Modules/ErrorPopup";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [newEdit, setNewEdit] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("https://instapups-server.onrender.com/feed", {
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

      if (res === "You are not following anyone") {
        return;
      } else {
        const loggedInUser = res.loggedInUser;
        setPosts(res.posts);
        setFetched(true);

      }
    };
    getPosts();
  }, [newPost, newEdit]);

  const closeErrorPopup = () => {
    setErrorPopup(false);
  }

  const updateFeed = () => {
    setNewPost(true);
    setInterval(() => {
      setNewPost(false)
    }, 1000);
  };

  const handleEditPost = () => {
    setNewEdit(true);
    setInterval(() => {
      setNewEdit(false)
    }, 1000);
  };

  return (
    <>
    {errorPopup ? <ErrorPopup onClose={closeErrorPopup}/> : null}
    <div className="profileWrapper">
      <div className="filler-div"></div>
      <Sidemenu />
      <div className="bark-wrapper">
        <CreatePosts updateFeed={updateFeed} />
        {fetched ? posts.map((post) => <Post key={post._id} {...post} onEditSubmit={handleEditPost} />) : <p>You are not following anyone...yet</p>}
      </div>
      <div className="Profile-filler"></div>
    </div>
    <Footer />
    </>
  );
};

export default Feed;
