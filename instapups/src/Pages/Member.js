import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../Modules/Post'
import '../sass/Pages/Member.pages.scss'
import Sidemenu from '../Modules/Sidemenu'

const Member = () => {
    const { id } = useParams();
    const [member, setMember] = useState([])
    const [posts, setPosts] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const getMember = async () => {
            const response = await fetch(`http://localhost:5051/members/:${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const res = await response.json();
            if (response.status !== 200) {
                console.log(res);
                return;
            }
            const valuesArray = Object.values(res)
            const postArray = valuesArray[1]
            setPosts(postArray);
            const memberArray = valuesArray[0]
            setMember(memberArray);

            
            setLoaded(true)
        }
        getMember()

        
    }, [id])

    console.log("Members:" + member)
    console.log(posts)

  return (
    <div className='memberPageWrapper'>
        <div></div>
        <Sidemenu />
      
      <div className='memberPage'>
      {loaded ? ( posts.map((post) => (
          <Post key={post._id} {...post} />
      ))) : ( "Loading...")}
      </div>
      <div className='memberPage-filler'>
        <img src= {member.profilePic} alt='profilePicture' />
        <h1>{member.username}</h1>
        </div>
    </div>
  )
}

export default Member