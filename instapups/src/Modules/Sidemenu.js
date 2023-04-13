import { Link } from "react-router-dom"
import '../sass/Modules/Sidemenu.modules.scss'

const Sidemenu = () => {
  return (
    <div className='sideMenuWrapper'>
        <Link to="/"><button>Home</button></Link>
        <Link to="/profile"><button>Your profile</button></Link>
        <Link to="/members"><button>Members</button></Link>
    </div>
  )
}

export default Sidemenu