import React from 'react'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

//First draft of MemberCardForMembersPage
// Need to update the parameters to match the data from the database
// Need to update the onClick function to follow the user
// Need to update the onClick function to unfollow the user
const MemberCardForMembersPage = ({username, usersprofilepic, _id }) => {
    const { id } = useParams();    
    const [isFollowing, setIsFollowing] = useState(false)
    const [follows, setFollows] = useState([]);


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
    }, []);

    const followOrNotFollow = async () => {
        if (isFollowing) {
            const response = await fetch('http://localhost:5051/members/unfollow', {
                method: 'DELETE',
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
                console.log(res);
                return;
            }
            console.log(res)
            setIsFollowing(!isFollowing)
            
            return;
        }

        else {
        const response = await fetch('http://localhost:5051/members/follow', {
            method: 'POST',
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
            console.log(res);
            return;
        }
        console.log(res)
        setIsFollowing(!isFollowing)
        
    }
}

   
  return (
    <div>
        <img src={usersprofilepic} alt={username}/> 
        <button onClick={() => followOrNotFollow()}>{isFollowing ? "-" : "+"}</button>
        <Link to={`/members/${_id}`}>{username}</Link>
    </div>

  )
}

export default MemberCardForMembersPage