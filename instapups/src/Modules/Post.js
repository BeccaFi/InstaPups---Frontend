import bone from '../Media/Icons/bone.png'
import { useState} from 'react'
import '../sass/Modules/Post.modules.scss'

const Post = ({ username, comments, likes, _id, content }) => {

  const [postLikes, setPostLikes] = useState(likes)
  const [showComments, setShowComments] = useState(false)
  const [bark, setBark] = useState('')
  const [amountOfLikes, setAmountOfLikes] = useState(likes.length)

  const postYourBark = async (e) => {
    e.preventDefault()
    const datePosted = new Date();
    const response = await fetch('http://localhost:5051/comments/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bark,
        datePosted
      }),
      credentials: 'include'
    })
    const res = await response.json()
    setAmountOfLikes(res.likes.length)
    // Här behövs det göras saker

  }

    const likePost = async (_id) => {
        const response = await fetch(`http://localhost:5051/posts/like/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const res = await response.json()
        console.log(res)
        // Här behövs det göras saker

    }
  return (
    <div>
      <div>
         {content.photos ? <img src={content.photos} alt={username}/>: null}
        <p>{content.text}</p>
        <h2>{username}</h2>
      </div>
      {/* <p>{comments}</p> */}
      <div>
        <div>
          <img className='likeButton' src={bone} alt='likes' onClick={(e)=> likePost(_id)} /> {amountOfLikes}
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
