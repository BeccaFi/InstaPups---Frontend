import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../Modules/Post'
import '../sass/Pages/Member.pages.scss'
import Sidemenu from '../Modules/Sidemenu'
import UserCard from '../Modules/OthersProfileCard'
import Footer from '../Modules/Footer'
import ErrorPopup from '../Modules/ErrorPopup'
import OwnProfileCard from '../Modules/OwnProfileCard'

const Member = () => {
  const { id } = useParams();
  const [member, setMember] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);
  const [followMessage, setFollowMessage] = useState();
  const [gotPosts, setGotPosts] = useState(true);
  const [postMessage, setPostMessage] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [newEdit, setNewEdit] = useState(false);

  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`https://instapups.onrender.com/members/${id}`, {
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
        setErrorPopup(true);
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
  }, [id, newEdit]);

  const closeErrorPopup = () => {
    setErrorPopup(false);
  };

  const handleEditPost = () => {
    setNewEdit(true);
    setInterval(() => {
      setNewEdit(false)
    }, 1000);
  };

  const handleFollowUnfollow = () => {
    setNewEdit(true);
    setIsFollowing(!isFollowing);
    setInterval(() => {
      setNewEdit(false);
    }, 1000);
  };

  return (
    <>
      {errorPopup ? <ErrorPopup onClose={closeErrorPopup} /> : null}
      <div className="memberPageWrapper">
        <div className="filler-div"></div>
        <Sidemenu />

        <div className='memberPage'>
        { member.username === loggedInUser.username ? <OwnProfileCard loggedInUser={loggedInUser} posts={posts} /> : <UserCard member={member} following={isFollowing} posts={posts} onFollowUnfollow={handleFollowUnfollow} />}
        { loaded ? member.username === loggedInUser.username ? posts.map((post) => (<Post key={post._id} {...post} onEditSubmit={handleEditPost}/>)) : (!isFollowing ? <p> {followMessage} </p> : (!gotPosts ? <p> {postMessage} </p> :  ( posts.map((post) => (<Post key={post._id} {...post} onEditSubmit={handleEditPost}/>))))) : ( "Loading..." ) }
        </div>

        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default Member;
