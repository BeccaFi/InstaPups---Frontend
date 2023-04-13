import CreatePosts from "../Modules/CreatePosts"
import Sidemenu from "../Modules/Sidemenu"
import '../sass/Pages/Profile.pages.scss'

const Profile = () => {
  return (
    <div className= 'profileWrapper'>
      <Sidemenu />
      <div>
    <CreatePosts />
    </div>
    <div>
      
    </div>
    </div>
  )
}

export default Profile