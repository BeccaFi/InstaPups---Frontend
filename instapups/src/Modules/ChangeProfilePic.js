import { useRef, useState } from "react";
import '../sass/Modules/ChangeProfilePic.modules.scss'
import ErrorPopup from "./ErrorPopup";

const ChangePicInput = (props) => {

    const user = props.user;
    const [wantChangePic, setWantChangePic] = useState(props.wantChange)
    const [newPicUrl,setNewPicUrl] = useState(``);
    const inputRef = useRef(null);
    const [errorPopup, setErrorPopup] = useState(false);
    let url = newPicUrl;

    if(newPicUrl){
        ChangeProfilePic();
        setNewPicUrl('');
        window.location.reload();
    }
    
     async function ChangeProfilePic() {
        try {
            const response = await fetch('https://instapups-server.onrender.com/members/settings/profilePicture', {
                method: 'PATCH',
                body: JSON.stringify({picUrl: newPicUrl}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        
            const res = await response.json();

            if (response.status !== 200){
                setErrorPopup(true);
                return;
            }

            window.location.reload();
    }   catch(error){
        setErrorPopup(true);
        return;
    }
        }

    async function cancelChange() {
        setWantChangePic(false);
        window.location.reload();
    }

    const closeErrorPopup = () => {
        setErrorPopup(false);
      }

    return (
        <>
        {errorPopup ? <ErrorPopup onClose={closeErrorPopup}/> : null}
        {wantChangePic ? 
            <div className="change-pic-div">
            <h3>Update profile picture</h3>
            <input id="pic-url-input" ref={inputRef} placeholder="Insert picture url"></input>
            <div className="pic-btn-div">
            <button id="confirm-pic-btn" onClick={() => setNewPicUrl(inputRef.current.value)}>Save</button>
            <button id="cancel-pic-btn" onClick={() => cancelChange()}>Cancel</button>
            </div>
            </div> : null}
        
        </>
    )
}

export default ChangePicInput;