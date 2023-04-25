import { Link } from "react-router-dom"
import "../sass/Modules/Footer.modules.scss"

const Footer = () => {
  return (
    <div className='foot-wrapper'>
        <div>
        <h3>Made by:</h3>
        <ul>
            <li><a href="https://github.com/BeccaFi/">Rebecca</a></li>
            <li><a href="https://github.com/Darkshiira">Hanna Arefiardakani</a></li>
            <li><a href="https://github.com/Shinyn">Mattias </a></li>
            <li><a href="https://github.com/danjeljansson">Daniel</a></li>
        </ul>
        </div>

        <div>
            <h3>Attributes</h3>
            <ul>
                <li><a href="https://www.freepik.com/free-vector/cute-pattern-with-dog-faces-bones_22991841.htm#page=3&query=dog%20wallpaper&position=0&from_view=search&track=robertav1_2_sidr">Image by lesyaskripak</a> on Freepik</li>
                <li><a href="https://www.flaticon.com/free-icons/add-image" title="add image icons">Add image icons created by nawicon - Flaticon</a></li>
                <li><a href="https://www.flaticon.com/free-icons/bone" title="bone icons">Bone icons created by Freepik - Flaticon</a></li>
            
            </ul>

        </div>
        

    </div>
  )
}

export default Footer