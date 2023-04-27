import { useState } from "react";
import '../sass/Modules/OwnProfileCard.modules.scss'
import settings from '../Media/Icons/settings.png'
import ChangePicInput from "./ChangeProfilePic";

const OwnProfileCard = ({loggedInUser, posts}) => {
    const postCount = posts.length;
    const [changePic, setChangePic] = useState(false);

    return (
        <div className='member-card'>
            <div className='member-card-main-info'>
                <div className="member-card-left">
                        <img src= {loggedInUser.profilePic} alt='profilePicture' onClick={() => setChangePic(true)}/>
                        <p className="pic-p-tag" onClick={() => setChangePic(true)}>Change picture</p>
                    <button className="settings-btn" onClick={() => alert('Upcoming feature, stay tuned!')}><p>Settings</p><img alt="gear-icon" src={settings}></img> </button>
                    {changePic ? <ChangePicInput user={loggedInUser.username} wantChange={changePic} /> : null}
                </div>
                <div className="member-card-middle">
                    <h1>{loggedInUser.username}</h1>
                    <div className="follows-posts-count">
                        <p>Following: </p>
                        <p>•</p>
                        <p>Posts: {postCount} </p>
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