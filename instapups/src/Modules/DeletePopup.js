import { useState } from "react";


const DeletePopup = (props) => {

    const id = props.id;
    const [wantDelete, setWantDelete] = useState(props.wantDelete)
    console.log(wantDelete);

    
    async function DeletePost() {

        const response = await fetch(`http://localhost:5051/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const res = await response.json();

        window.location.reload();

    }

    async function cancelDelete() {
        setWantDelete(false);
        window.location.reload();
    }

    return (
        <>
        {wantDelete ?
        <div className="delete-popup">
            <p>Are you sure you want to delete this post?</p>
            <div className="popup-btns">
                <button id="delete-btn" onClick={() => DeletePost()}>Delete</button>
                <button id="cancel-btn" onClick={() => cancelDelete()}>Cancel</button>
            </div>
        </div>
        : null}
        
        </>
    )
}

export default DeletePopup;