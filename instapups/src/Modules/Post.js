import bone from '../Media/Icons/bone.png'
import { useState} from 'react'


//Måste kolla igenom props.namnen som fetchar sedan
const Post = (props) => {
    const [likes, setLikes] = useState(props.props.likes)
    const [comments, setComments] = useState(false)
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
            <img src={props.props.url} /> <h2>{props.props.username}</h2>
          </div>
          <p>{props.props.comments}</p>
          <div>
            <div>
              <img src={bone} />{props.props.likes}
            </div>
            <button onClick={(e)=> setComments(true)}>Barks{props.props.comments.amount}</button>
          </div>
          {comments && (
            <div>
              {props.props.comments.map((comment) => { return <div> <img src={props.props.comments.username}></img> <p>{comment}</p></div> })}
              <div>
                <img src={props.props.comments.profilepicture}></img>
                <input type='text' placeholder='Bark here...' onChange={(e)=>setBark(e.target.value)} />
                <button onClick={(e) => postYourBark(e)}>Bark</button>
              </div>
            </div>
          )}
        </div>
      )
    }

export default Post