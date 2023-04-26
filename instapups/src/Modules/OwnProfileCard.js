import { useRef, useState } from "react";
import '../sass/Modules/OwnProfileCard.modules.scss'
import settings from '../Media/Icons/settings.png'
import ChangePicInput from "./ChangeProfilePic";

const OwnProfileCard = (props) => {

    const member = props.loggedInUser;
    // const followCount = member.following.length;
    // const postCount = props.posts.length;
    const [changePic, setChangePic] = useState(false);

    return (
        <div className='member-card'>
            <div className='member-card-main-info'>
                <div className="member-card-left">
                        <img src= {member.profilePic} alt='profilePicture' onClick={() => setChangePic(true)}/>
                        <p className="pic-p-tag" onClick={() => setChangePic(true)}>Change picture</p>
                    <button className="settings-btn"><p>Settings</p><img alt="gear-icon" src={settings}></img> </button>
                    {changePic ? <ChangePicInput user={member.username} wantChange={changePic} /> : null}
                </div>
                <div className="member-card-middle">
                    <h1>{member.username}</h1>
                    <div className="follows-posts-count">
                        <p>Following: </p>
                        <p>•</p>
                        <p>Posts: </p>
                    </div>
                </div>
                <div className="member-card-right">
                    <h1>Facts</h1>
                    <ul>
                        <li>Breed: </li>
                        <li>Favorite food: </li>
                        <li>Favorite toy: </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OwnProfileCard;