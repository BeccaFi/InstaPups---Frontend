import React, { useState } from "react";
import updatePost from "./updatePost";

function EditPost({
  post: { username, datePosted, comments, likes, _id, content, photos, onEdit },
}) {
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

  const handleImageChange = (event) => {
    setEditPhotos(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit && onEdit({ editText, editPhotos });
  };

  const handlePostEdit = (updatedPost) => {
    updatePost(post.id, updatedPost).then(() => {
      setPost(updatedPost);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="post-text"></label>
        <input
          type="text"
          id="edit-text-input"
          value={editText}
          onChange={handlePostTextChange}
        />
      </div>
      <div>
        <label htmlFor="image"></label>
        <input
          type="text"
          placeholder="Add an image URL"
          onChange={(e) => setEditPhotos([e.target.value])}
        />
      </div>
      <button
        type="submit"
        id="save-btn"
        onClick={() =>
          updatePost(_id, {
            text: editText,
            photos: editPhotos,
          })
        }
      >
        Save
      </button>
    </form>
  );
}

export default EditPost;
