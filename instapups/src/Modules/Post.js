import bone from '../Media/Icons/bone.png'
import { useState} from 'react'

const Post = ({ url, username, comments, likes }) => {
  const [postLikes, setPostLikes] = useState(likes)
  const [showComments, setShowComments] = useState(false)
  const [bark, setBark] = useState('')

  const postYourBark = async (e) => {
    e.preventDefault()
    const datePosted = new Date();
    const response = await fetch('http://localhost:5050/comments/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bark,
        datePosted
      }),
      Credentials: 'include'
    })
    const res = await response.json()
    console.log(res)
    // Här behövs det göras saker

  }

  return (
    <div>
      <div>
        <img src={url} alt={username} /> 
        <h2>{username}</h2>
      </div>
      {/* <p>{comments}</p> */}
      <div>
        <div>
          <img src={bone} alt='likes' /> {postLikes.length}
        </div>
        <button onClick={() => setShowComments(true)}>Barks</button>
      </div>
      {showComments && (
        <div>
          {/* {comments.map((comment, index) => (
            <div key={index}>
              <img src={comment.url} alt={comment.username} />
              <p>{comment.username}: {comment.text}</p>
            </div>
          ))} */}
          <div>
            <input type='text' placeholder='Bark here...' onChange={(e) => setBark(e.target.value)} />
            <button onClick={(e) => postYourBark(e)}>Bark</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
