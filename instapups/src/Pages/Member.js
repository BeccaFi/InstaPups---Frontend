import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../Modules/Post'
import '../sass/Pages/Member.pages.scss'
import Sidemenu from '../Modules/Sidemenu'
import Footer from '../Modules/Footer'
import Popup from '../Modules/Popup'

const Member = () => {
    const { id } = useParams();
    const [member, setMember] = useState([])
    const [posts, setPosts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [popup, setPopup] = useState(false)

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
                if (response.status === 401) {
                    window.location.href = '/';
                }
                setPopup(true)
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

    const closePopup = () => {
        setPopup(false)
    }



  return (
    <>
    {popup ? <Popup onClose={closePopup}/> : null}
    <div className='memberPageWrapper'>
        <div className="filler-div"></div>
        <Sidemenu />
      
      <div className='memberPage'>
      {loaded ? ( posts.map((post) => (
          <Post key={post._id} {...post} />
      ))) : ( "Loading...")}
      </div>
      <div className='memberPage-filler'>
        <div className='memberPage-filler__profile'>
        <img src= {member.profilePic} alt='profilePicture' />
        <h1>{member.username}</h1>
        </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Member