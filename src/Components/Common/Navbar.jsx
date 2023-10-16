import React from 'react'
import { NavLink } from 'react-router-dom'
import weblogo from '../../data/weblogo.png'

const Navbar = () => {
  return (
    <div className='w-screen py-4 bg-transparent flex items-center justify-between md:px-20 px-5 gap-4 text-teal-100 border-b border-slate-800'>
      <div className='flex items-center justify-between gap-4'>
          <img src={weblogo} alt="logo" className='w-8'/>
          <h1 className='text-2xl font-bold'>POD-X</h1>
      </div>
        <div className='flex items-center justify-between gap-2'>
          <NavLink to='/' className={'text-[16px] font-medium'}>Signup</NavLink>
          <NavLink to='/login' className={'text-[16px] font-medium'}>Login</NavLink>
        </div>
    </div>
    
  )
}

export default Navbar
