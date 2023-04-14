import { useState } from "react"
import addimage from '../Media/Icons/add-image.png'
import '../sass/Modules/CreatePosts.modules.scss'

const CreatePosts = () => {
    const [bark, setBark] = useState('')
    const [popup, setPopup] = useState(false)
    const [image, setImage] = useState('')

    const postingBarks = async (e) => {
        e.preventDefault()
        const datePosted = new Date();
        const response = await fetch('http://localhost:5051/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: bark,
                photos: image,
                datePosted
            }),
            Credentials: 'include'
        })
        const res = await response.json()
        console.log(res)
        // Här behövs det göras saker
        
    }


  return (
    <div className='Your-bark'>
        <input
        className='Your-bark-input'
        onChange={(e) => setBark(e.target.value)}
        type='text'
        placeholder='Bark here...'
        />
        <div className='Your-bark-icon-Wrapper'>
            <img className='imageIcon' src= {addimage} alt= 'icon of an image' onClick={(e) => setPopup(true)}></img>
            <button className='Your-bark-button' onClick={(e) => postingBarks(e)}>Bark</button>
        </div>

        {popup && (
            <div className='Your-bark-popup'>
                <button onClick={(e) => setPopup(false)}>X</button>
                <input className='Your-bark-popup-input' type='text' placeholder='Add an image url' onChange={(e) => setImage(e.target.value)} />
            </div>
        )}
        
    </div>
  )
}

export default CreatePosts