import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const UserNav = () => {
  return (
    <>
    <div className='w-screen py-4 bg-transparent flex items-center justify-center gap-4 text-teal-100 border-b border-slate-800 mb-3 z-1000'>
      <NavLink to='/user/podcasts' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Podcasts</NavLink>
      <NavLink to='/user/create-podcast' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Create Podcast</NavLink>
      <NavLink to='/user/details' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Profile</NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default UserNav