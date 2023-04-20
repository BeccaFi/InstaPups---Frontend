import React from 'react'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../sass/Modules/MemberCardForMembersPage.modules.scss'

const MemberCardForMembersPage = ({username, profilePic, _id }) => { 
    const [isFollowing, setIsFollowing] = useState(false)
    const [follows, setFollows] = useState(0);


    useEffect(() => {
        const getFollows = async () => {
            const response = await fetch('http://localhost:5051/members/follows', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const res = await response.json();
            


            if (response.status !== 200) {
                if (response.status === 401) {
                    return (window.location.href = '/');
                }
                // Need an answer to this error here
                return;
            }
           const follows = res.find((follow) => follow === username)

            if (follows === undefined) {
                setIsFollowing(false)

            } else {
                setIsFollowing(true)
            }
                
            }

        getFollows();
    }, [follows]);

    const followOrNotFollow = async () => {

        const response = await fetch('http://localhost:5051/members/follow', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username: username }),
        });

        const res = await response.json();
        if (response.status !== 200) {
            if (response.status === 401) {
                return (window.location.href = '/');
            }
            console.log(res)
            return;
        }
        if (res === "followed") {
            setIsFollowing(true)
            setFollows(+1)
        } else {
            setIsFollowing(false)
            setFollows(+1)
        }
        
    }


   
  return (
    <div className='memberCard-Wrapper'>
        <img className='memberCardProfilePic' src={profilePic} alt={username}/> 
        <button onClick={() => followOrNotFollow()}>{isFollowing ? "-" : "+"}</button>
        <Link to={`/members/${_id}`}>{username}</Link>
    </div>

  )
}

export default MemberCardForMembersPage