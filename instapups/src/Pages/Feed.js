import CreatePosts from "../Modules/CreatePosts";
import Sidemenu from "../Modules/Sidemenu";
import "../sass/Pages/Feed.pages.scss";
import { useState, useEffect } from "react";
import Post from "../Modules/Post";
import Footer from "../Modules/Footer";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:5051/feed", {
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
        console.log(res);
        return;
      }

      if (res === "You are not following anyone") {
        return;
      } else {
        setPosts(res);
        setFetched(true);
      }
    };
    getPosts();
  }, [posts]);

  return (
    <>
    <div className="profileWrapper">
      <div></div>
      <Sidemenu />
      <div className="bark-wrapper">
        <CreatePosts />
        {fetched ? posts.map((post) => <Post key={post._id} {...post} />) : <p>You are not following anyone...yet</p>}
      </div>
      <div className="Profile-filler"></div>
    </div>
    <Footer />
    </>
  );
};

export default Feed;
