import { useRef, useState } from "react";
const urlInput = document.querySelector('#input');

const LoggedInUserCard = (props) => {

    const member = props.loggedInUser;
    const [changePic, setChangePic] = useState(false);
    const [newPicUrl,setNewPicUrl] = useState(``);
    const inputRef = useRef(null);
    console.log(newPicUrl);

    const inputChange = (e) => {
       setNewPicUrl(inputRef.current.value);
       const url = newPicUrl;
   
    }
    
const DisplayUrlInput = () => {
            return (
                <div>
                <input ref={inputRef} id="input" placeholder="insert picture url"></input>
                <button onClick={() => inputChange()}>Ok</button>
                </div>
            )
        }
    
    function ChangeProfilePic() {
  
        
        const ProfilePic = async () => {
            const response = await fetch('http://localhost:5051/members/settings/profilePicture/${url}', {
                method: 'PATCH',
                body: JSON.stringify({ username: member.username, picUrl: newPicUrl}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        
            const res = await response.json();
    
            // if(res === 'followed') {
            //     setFollows(true);
            // }
            // else {
            // setFollows(false);
            // }
        }
    
    }

    return (
        <div className='memberPage-filler'>
            <div className='memberPage-filler__profile'>
                <h1>{member.username}</h1>
                <button onClick={() => setChangePic(true)}>Change profile picture</button>
                {changePic ? <DisplayUrlInput /> : null}
            </div>
        </div>
    )

}

export default LoggedInUserCard;