import React from 'react'

//First draft of MemberCardForMembersPage
// Need to update the parameters to match the data from the database
// Need to update the onClick function to follow the user
// Need to update the onClick function to unfollow the user
const MemberCardForMembersPage = ({username, usersprofilepic, userid }) => {
  return (
    <div>
        <img src={usersprofilepic} alt={username}/> 
        <button onClick={() => console.log(userid)}>Follow</button>
        <h2>{username}</h2>
    </div>

  )
}

export default MemberCardForMembersPage