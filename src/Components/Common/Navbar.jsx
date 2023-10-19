import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import weblogo from '../../data/weblogo.png'

const Navbar = () => {


  const navigate = useNavigate()

  return (
    <div>
        <div className='w-screen py-4 bg-transparent flex items-center justify-between md:px-20 px-5 gap-4 text-teal-100 border-b border-slate-800'>
         
          <div 
          // on click on the logo to navigate to the home page
          onClick={() => navigate('/')} 
          className='flex items-center justify-between gap-4'>
              <img src={weblogo} alt="logo" className='w-8'/>
              <h1 className='text-2xl font-bold'>POD-X</h1>
          </div>

          {/* Navigation links for unauthenticated users*/}
            <div className='flex items-center justify-between md:gap-8 gap-4'>
              <NavLink to='/' className={'text-[16px] font-medium hidden sm:block'}>Home</NavLink>
              <NavLink to='/signup' className={'text-[16px] font-medium'}>Signup</NavLink>
              <NavLink to='/login' className={'text-[16px] font-medium'}>Login</NavLink>
            </div>

        </div>

        {/* Outlet for routing/neted routes */}
        <Outlet/>
    </div>
    
  )
}

export default Navbar
