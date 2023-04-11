import React from 'react'
import { useParams } from 'react-router-dom'

const Member = () => {
    const { id } = useParams();

  return (
    <div>Member</div>
  )
}

export default Member