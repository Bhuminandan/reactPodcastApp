import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const user = useSelector((state) => state.userSlice.user)
    console.log(user);
  return (
    <div>
        <h1>hii</h1>
    </div>
  )
}

export default Profile