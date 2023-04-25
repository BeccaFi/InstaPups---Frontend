import { useState } from "react";
import addimage from "../Media/Icons/add-image.png";
import "../sass/Modules/CreatePosts.modules.scss";

const CreatePosts = () => {
  const [bark, setBark] = useState("");
  const [popup, setPopup] = useState(false);
  const [image, setImage] = useState([]);
  const [response, setResponse] = useState("");

  const postingBarks = async (e) => {
    e.preventDefault();
    const text = bark;
    const photos = image;
    var date = new Date();
    var datePosted = date.toISOString().slice(0, 16).replace("T", " ");
    const response = await fetch("http://localhost:5051/posts/create", {
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
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/";
      }
      setResponse("Something went wrong, please try again later");
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
    setResponse("Your bark has been posted!");
    setTimeout(() => {
      setResponse("");
    }, 3000);

    setBark("");
  };

  return (
    <div className="Your-bark">
      <div className="Your-bark-icon-Wrapper">
        <img className="imageIcon" src={addimage} alt="icon of an image" onClick={(e) => setPopup(true)}></img>
        <input className="Your-bark-input" onChange={(e) => setBark(e.target.value)} type="text" placeholder="Bark here..." value={bark}/>
        <p className="Your-bark-response">{response}</p>
        <button className="Your-bark-button" onClick={(e) => postingBarks(e)}>
          Bark
        </button>
      </div>

      {popup && (
        <div className="Your-bark-popup">
          <button className="Your-bark-popup-button" onClick={(e) => setPopup(false)}>
          ❌
          </button>
          <input className="Your-bark-popup-input" type="text" placeholder="Add an image url" onChange={(e) => setImage([e.target.value])} />
        </div>
      )}
    </div>
  );
};

export default CreatePosts;
