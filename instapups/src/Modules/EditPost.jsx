import React, { useState } from "react";
import updatePost from "./updatePost";
import "../sass/Modules/EditPost.modules.scss";

function EditPost({ post: { username, datePosted, comments, likes, _id, content, photos, onEdit }, updatefeed }) {
  const [editText, setEditText] = useState(content.text);
  const [editPhotos, setEditPhotos] = useState(content.photos);
  const [post, setPost] = useState({
    username,
    datePosted,
    comments,
    likes,
    _id,
    content,
    photos,
  });

  const handlePostTextChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit && onEdit({ editText, editPhotos });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="text-edit">
        <label htmlFor="post-text"></label>
        <textarea type="text" id="edit-text-input" value={editText} onChange={handlePostTextChange} />
        <label htmlFor="image"></label>
        <input type="text" id="edit-image-url" placeholder="Add an image URL" onChange={(e) => setEditPhotos([e.target.value])} />
      </div>
      <button
        type="submit"
        id="save-btn"
        onClick={() =>
          updatePost(_id, {
            text: editText,
            photos: editPhotos,
          }, updatefeed())
        }
      >
        Save
      </button>
    </form>
  );
}

export default EditPost;
