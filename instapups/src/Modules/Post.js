import bone from "../Media/Icons/bone.png";
import { useState, useEffect } from "react";
import "../sass/Modules/Post.modules.scss";
import { Link } from "react-router-dom";

const Post = ({ username, comments, likes, _id, content}) => {
  const [showComments, setShowComments] = useState(false);
  const [bark, setBark] = useState("");
    const [member, setMember] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [response, setResponse] = useState("");
    const [comments2, setComments2] = useState(comments);
  const [likes2, setLikes2] = useState(likes);

  useEffect (() => {
    const getMember = async () => {
        const response = await fetch(`http://localhost:5051/members/userinfo?username=${username}`, {
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
            console.log(res)
            return;
        }
        setMember(res);
        setLoaded(true);
    }
    getMember();
    }, [comments2, likes2])

  const postYourBark = async (e) => {
    e.preventDefault();
    const id = _id;
    const comment = bark;
    const response = await fetch(`http://localhost:5051/posts/${_id}/comment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        id
      }),
      credentials: "include",
    });
    const res = await response.json();
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/";
      }
      console.log(res)
      return;
    }
    setComments2([...comments, res.comment]);
    setResponse("Bark posted!")
    setTimeout(() => {
        setResponse("")
    }, 3000)
    setBark("");
    

  };
  const likePost = async (_id) => {
    const response = await fetch(`http://localhost:5051/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes2,
      }),
      credentials: "include",
    });
    const res = await response.json();
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/";
      }
    }
    console.log(res)
      setLikes2(res.likes);
      return;
    
  };

  const toggleBarkButton = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  return (
    <div className="post-Wrapper">
        {loaded ?
            <div key={member._id}>
                <img className="MembersProfilePic" src={member.profilePic} alt={username} />
        <Link className="link-to-Member" to={`/members/${member._id}`}>{username}</Link>
            </div>
         : null}
      <div>
        
        {content.photos.length > 0 ? <img className="content-Photo" src={content.photos.map(photo => photo)} alt={username} /> : null}
        <p className="content-Text">{content.text}</p>
        
      </div>
      <div className="like-And-Barks-Wrapper">
        <div>
          <img className="likeButton" src={bone} alt="likes" onClick={(e) => likePost(_id)} /> {likes2.length}
        </div>
        <button className="barkButton" onClick={() => toggleBarkButton()}>Barks ({comments.length})</button>
      </div>
      {showComments && (
        <div className= "bark-Field-Wrapper">
          {comments2.map((comment, index) => (
            <div key={index}>
              <p>
                {comment.username}: {comment.comment}
              </p>
            </div>
          ))}
          <div>
            <input type="text" placeholder="Bark here..." onChange={(e) => setBark(e.target.value)} />
            <button onClick={(e) => postYourBark(e)}>Bark</button>
          </div>
            <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
