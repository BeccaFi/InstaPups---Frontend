import { useRef, useState } from "react";
import '../sass/Modules/ChangeProfilePic.modules.scss'

const ChangePicInput = (props) => {

    const user = props.user;
    const [wantChangePic, setWantChangePic] = useState(props.wantChange)
    const [newPicUrl,setNewPicUrl] = useState(``);
    const inputRef = useRef(null);
    let url = newPicUrl;

    if(newPicUrl){
        ChangeProfilePic();
        setNewPicUrl('');
        console.log(newPicUrl);
        window.location.reload();
    }
    
     async function ChangeProfilePic() {
  
            const response = await fetch('http://localhost:5051/members/settings/profilePicture', {
                method: 'PATCH',
                body: JSON.stringify({picUrl: newPicUrl}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        
            const res = await response.json();

            window.location.reload();
    }

    async function cancelChange() {
        setWantChangePic(false);
        window.location.reload(); //Without this, the pic is only clickable once atm. How to solve?
    }

    return (
        <>
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