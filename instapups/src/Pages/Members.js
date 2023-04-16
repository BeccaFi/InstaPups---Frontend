import { useEffect, useState } from 'react'
import MemberCardForMembersPage from '../Modules/MemberCardForMembersPage'
import Sidemenu from '../Modules/Sidemenu'
import '../sass/Pages/Members.pages.scss'

//First draft, need to update the parameters to match the data from the database
const Members = () => {
  const [members, setMembers] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const getMembers = async () => {
      const response = await fetch('http://localhost:5051/members'
      , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const res = await response.json()
      if (response.status !== 200) {
        console.log(res)
        return
      }
      setMembers(res)
      setFetched(true)
    }
    getMembers()
  }, [])

  return (
    <div className='membersWrapper'>
    
      <Sidemenu />
      <div>
      <select>
        <option value="all">All</option>
        <option value="Following">Following</option>
        <option value="nonfollowing">NOt following</option>
      </select>
      <div>
        {fetched ? members.map((member) => (
          <MemberCardForMembersPage key={member._id} {...member} />
        )): <p>Loading</p>}
      </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Members