import CreatePosts from "../Modules/CreatePosts"
import Sidemenu from "../Modules/Sidemenu"
import '../sass/Pages/Profile.pages.scss'
import { useState, useEffect } from "react"
import Post from "../Modules/Post"

const Feed = () => {
  const [posts, setPosts] = useState({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:5051/feed'
      , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        Credentials: 'include'
      })

      const res = await response.json()
      setPosts(res)
      setFetched(true)
    }
    getPosts()
    console.log(posts)
  }, [])

  return (
    <div className= 'profileWrapper'>
      <Sidemenu />
      <div>
    <CreatePosts />
    {/* {fetched ? posts.findPosts.map((post) => (
      <Post key={post._id} props={post} />
    )): <p>Loading...</p>} */}
    
    </div>
    <div className='Profile-filler'>

    </div>
    </div>
  )
}

export default Feed