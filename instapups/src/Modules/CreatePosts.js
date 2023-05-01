import { useState } from "react";
import addimage from "../Media/Icons/add-image.png";
import "../sass/Modules/CreatePosts.modules.scss";

const CreatePosts = ({ updateFeed }) => {
  const [bark, setBark] = useState("");
  const [barkPopup, setBarkPopup] = useState(false);
  const [image, setImage] = useState([]);
  const [response, setResponse] = useState("");

  const postingBarks = async (e) => {
    e.preventDefault();
    const text = bark;
    const photos = image;
    var date = new Date();
    var datePosted = date.toISOString().slice(0, 16).replace("T", " ");
    const response = await fetch("https://instapups.onrender.com/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        photos,
        datePosted,
      }),
      credentials: "include",
    });

    const res = await response.json();

    if (response.status !== 201) {
      if (response.status === 401) {
        window.location.href = "/";
      }

      if (response.status === 400) {
        setResponse(res);
        return;
      }

      setResponse("Something went wrong, please try again later");
      setTimeout(() => {
        setResponse("");
      }, 3000);

      return;
    }

    setResponse("Your bark has been posted!");
    setTimeout(() => {
      setResponse("");
    }, 3000);

    setBark("");
    setImage([]);
    updateFeed();
  };

  return (
    <div className="Your-bark">
      <div className="Your-bark-icon-Wrapper">
        <img className="imageIcon" src={addimage} alt="icon of an image" onClick={(e) => setBarkPopup(true)}></img>
        <textarea className="Your-bark-input" onChange={(e) => setBark(e.target.value)} placeholder="Bark here..." value={bark} />
        <p className="Your-bark-response">{response}</p>
        <button className="Your-bark-button" onClick={(e) => postingBarks(e)}>
          Bark
        </button>
      </div>

      {barkPopup && (
        <div className="Your-bark-barkPopup">
          <button className="Your-bark-barkPopup-button" onClick={(e) => setBarkPopup(false)}>
            ❌
          </button>
          <input
            className="Your-bark-barkPopup-input"
            type="text"
            placeholder="Add an image url"
            value={image}
            onChange={(e) => setImage([e.target.value])}
          />
        </div>
      )}
    </div>
  );
};

export default CreatePosts;
