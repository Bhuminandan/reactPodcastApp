import React from 'react'
import { useSelector } from 'react-redux'
import CustomeBtn from '../Common/CustomeBtn';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import PageLoader from '../Common/PageLoader';

const Profile = () => {

  const user = useSelector((state) => state.userSlice.user)
  console.log(user);


  const handleSignOut = async () => {

    console.log('inside the signout');

    try {
      await signOut(auth)
      toast.success('Logged Out Successfully')      
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <PageLoader/>
      </div>
    )
  }

  return (
    <div className='text-white'>
      <h1>{ user.name }</h1>
      <h2>{ user.email }</h2>
      <h3>{ user.uid }</h3>
      <CustomeBtn
      type={'submit'}
      action={handleSignOut}
      btnText={'Logout'}
      disabled={false}
      />
    </div>
  )
}

export default Profile