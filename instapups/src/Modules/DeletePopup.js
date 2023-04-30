import { useState } from "react";
import ErrorPopup from "./ErrorPopup";

const DeletePopup = (props) => {
  const id = props.id;
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
    props.toggleDeleteButton();
    props.onEditSubmit();
  } catch (error) {
    setErrorPopup(true);
    return;
  }
}

  async function cancelDelete() {
    props.toggleDeleteButton();
  }

  const closeErrorPopup = () => {
    setErrorPopup(false);
  }

  return (
    <>
    {errorPopup ? <ErrorPopup onClose={closeErrorPopup}/> : null}
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
    </>
  );
};

export default DeletePopup;
