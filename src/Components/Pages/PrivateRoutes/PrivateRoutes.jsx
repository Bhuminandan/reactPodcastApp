import React from 'react'
import {auth} from '../../../firebase'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageLoader from '../../Common/PageLoader'


const PrivateRoutes = () => {

const [user, loading, error] = useAuthState(auth);


  if (loading) {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <PageLoader/>
        </div>
    )
  } else if(!user || error) {
    return <Navigate to='/'/>
  } else {
    return <Outlet/>
  }
}

export default PrivateRoutes