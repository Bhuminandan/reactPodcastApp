import React from 'react'
import { useSelector } from 'react-redux'
import CustomeBtn from '../Common/CustomeBtn';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import PageLoader from '../Common/PageLoader';

const Profile = () => {

  // Getting the user details from the redux
  const user = useSelector((state) => state.userSlice.user)
  console.log(user);


  // Sign Out Function 
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success('Logged Out Successfully')      
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  }

  // Showing loader while loading
  if (!user) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <PageLoader/>
      </div>
    )
  }

  // Profile Page
  return (
    <div className='w-screen h-screen flex flex-col items-start justify-start gap-2'>
    <div className='text-white  max-w-screen-xl border mt-10 m-auto'>
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
    </div>
  )
}

export default Profile