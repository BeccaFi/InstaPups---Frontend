import CreatePosts from "../Modules/CreatePosts"
import Sidemenu from "../Modules/Sidemenu"
import '../sass/Pages/Profile.pages.scss'
import { useState, useEffect } from "react"
import Post from "../Modules/Post"

const Profile = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:5050/posts')
      const res = await response.json()
      setPosts(res)
    }
    getPosts()
  }, [])

  return (
    <div className= 'profileWrapper'>
      <Sidemenu />
      <div>
    <CreatePosts />
    {posts.map((post) => (
      <Post key={post._id} post={post} />
    ))}
    
    </div>
    <div className='Profile-filler'>

    </div>
    </div>
  )
}

export default Profile