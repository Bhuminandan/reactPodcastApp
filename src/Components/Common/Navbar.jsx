import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
  return (
    <div className='w-screen py-4 bg-transparent flex items-center justify-center gap-4 text-teal-100 border-b border-slate-800'>
      <NavLink to='/' className={'text-[16px] font-medium'}>Signup</NavLink>
      <NavLink to='/login' className={'text-[16px] font-medium'}>Login</NavLink>
    </div>
    
  )
}

export default Navbar
