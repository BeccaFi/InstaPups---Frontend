import { useEffect, useState } from "react";
import '../sass/Modules/OthersProfileCard.modules.scss'


const UserCard = (props) => {

    const member = props.member;
    const followCount = member.following.length;
    const postCount = props.posts.length;
    const [follows, setFollows] = useState(props.following);
    console.log(member);
    
    const FollowUnfollow = async () => {
        const response = await fetch('http://localhost:5051/members/follow', {
            method: 'PATCH',
            body: JSON.stringify({ username: member.username }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
    
        const res = await response.json();

        if(res === 'followed') {
            setFollows(true);
        }
        else {
        setFollows(false);
        }
    }

    return (
        <div className='member-card'>
            <div className='member-card-main-info'>
                <div className="member-card-left">
                    <img src= {member.profilePic} alt='profilePicture' />
                    <button className="follow-button" onClick={() => {FollowUnfollow(); window.location.reload();}}>{follows ? 'Unfollow' : 'Follow'}</button>
                </div>
                <div className="member-card-middle">
                    <h1>{member.username}</h1>
                    <div className="follows-posts-count">
                        <p>Following: {followCount}</p>
                        <p>•</p>
                        <p>Posts: {postCount}</p>
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


export default UserCard;