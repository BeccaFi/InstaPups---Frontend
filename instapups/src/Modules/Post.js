import bone from "../Media/Icons/bone.png";
import { useState, useEffect } from "react";
import "../sass/Modules/Post.modules.scss";
import { Link } from "react-router-dom";

const Post = ({ username, comments, likes, _id, content}) => {
  const [showComments, setShowComments] = useState(false);
  const [bark, setBark] = useState("");
    const [member, setMember] = useState([]);
    const [loaded, setLoaded] = useState(false);

  useEffect (() => {
    const getMember = async () => {
        const response = await fetch(`http://localhost:5051/members/memberinfo?username=${username}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        });
    
        const res = await response.json();
        if (response.status !== 200) {
            console.log(res);
            return;
        }
        setMember(res);
        setLoaded(true);
    }
    getMember();
    }, [comments])

  const postYourBark = async (e) => {
    e.preventDefault();
    const id = _id;
    const comment = bark;
    const response = await fetch(`http://localhost:5051/posts/comment/${_id}`, {
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
  };

  const likePost = async (_id) => {
    const response = await fetch(`http://localhost:5051/posts/like/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    console.log(res);

    window.location.reload();
    // Ingen snygg lösning men....
  };

  const toggleBarkButton = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };

  return (
    <div>
        {loaded ?
            <div key={member._id}>
                <img src={member.profilePic} alt={username} />
        <Link to={`/members/${member._id}`}>{username}</Link>
            </div>
         : null}
      <div>
        
        {content.photos ? <img src={content.photos.map(photo => photo)} alt={username} /> : null}
        <p>{content.text}</p>
        
      </div>
      <div>
        <div>
          <img className="likeButton" src={bone} alt="likes" onClick={(e) => likePost(_id)} /> {likes.length}
        </div>
        <button onClick={() => toggleBarkButton()}>Barks ({comments.length})</button>
      </div>
      {showComments && (
        <div>
          {comments.map((comment, index) => (
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
        </div>
      )}
    </div>
  );
};

export default Post;
