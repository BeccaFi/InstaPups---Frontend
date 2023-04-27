import { useState } from "react";
import ErrorPopup from "./ErrorPopup";

const DeletePopup = (props) => {
  const id = props.id;
  const [wantDelete, setWantDelete] = useState(props.wantDelete);
  const [errorPopup, setErrorPopup] = useState(false);

  async function DeletePost() {

    try{
      const response = await fetch(`http://localhost:5051/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const res = await response.json();

    if(response.status !== 200){
      setErrorPopup(true);
      return;
    }
    
    window.location.reload();
  } catch (error) {
    setErrorPopup(true);
    return;
  }
}

  async function cancelDelete() {
    setWantDelete(false);
    window.location.reload();
  }

  const closeErrorPopup = () => {
    setErrorPopup(false);
  }

  return (
    <>
    {errorPopup ? <ErrorPopup onClose={closeErrorPopup}/> : null}
      {wantDelete ? (
        <div className="delete-popup">
          <p>Are you sure you want to delete this post?</p>
          <div className="popup-btns">
            <button id="delete-btn" onClick={() => DeletePost()}>
              Delete
            </button>
            <button id="cancel-btn" onClick={() => cancelDelete()}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

    </>
  );
};

export default DeletePopup;
