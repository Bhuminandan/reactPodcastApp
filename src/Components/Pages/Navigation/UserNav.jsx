import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import weblogo from '../../../data/weblogo.png'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMobNavOpen } from '../../../slices/commonSlices'
import { IoChevronBack } from 'react-icons/io5'
import Footer from './Footer'

const UserNav = () => {

  // Getting the navigate and dispatch refs
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting the states
  const isMobMenuOpen = useSelector((state) => state.commonSlice.isMobNavOpen);

  // Getting the current url
  const currentUrl = window.location.pathname;


  // Handling the back button
  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <>
      {
        // If the current url is /user/podcasts then hide the back button
        currentUrl === '/user/podcasts' ?
          <></>
          :
          <div
            onClick={handleBackClick}
            className='text-white ml-14 text-xl hidden lg:block cursor-pointer md:text-3xl absolute top-24 hover:bg-slate-900 p-4 rounded-full transition-all duration-300'>
            <IoChevronBack />
          </div>
      }
      <div className='w-screen flex md:hidden relative py-4 bg-transparent px-5 md:px-20 items-center justify-between gap-4 text-teal-100 border-b border-slate-800 mb-3 z-1000'>
        <div className='flex items-center justify-between gap-4 z-40' >
          <img className='w-10' src={weblogo} alt="weblogo" />
          <div className='text-2xl font-bold'>POD-X</div>
        </div>
        <div className={`flex-col items-start justify-start pt-40 gap-2 absolute top-0 w-4/5 h-screen flex bg-zinc-950 -left-5 z-20`} style={{ transform: `translateX(${isMobMenuOpen ? 0 : '-100%'})`, transition: 'transform 0.3s ease-in-out' }}>
          <NavLink to='/user/podcasts' className={' pl-10 mr-2 w-full text-4xl py-2 px-2 rounded-md hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}
            onClick={() => dispatch(toggleMobNavOpen())}
          >Podcasts</NavLink>
          <NavLink to='/user/create-podcast' className={' pl-10 mr-2 w-full text-4xl py-2 px-2 rounded-md hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}
            onClick={() => dispatch(toggleMobNavOpen())}
          >Create Podcast</NavLink>
          <NavLink to='/user/details' className={' pl-10 mr-2 w-full text-4xl py-2 px-2 rounded-md hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}
            onClick={() => dispatch(toggleMobNavOpen())}
          >Profile</NavLink>
          <NavLink to='/user/privacy-policy' className={' pl-10 mr-2 w-full text-4xl py-2 px-2 rounded-md hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}
            onClick={() => dispatch(toggleMobNavOpen())}
          >Privacy</NavLink>
        </div>
        {
          isMobMenuOpen ?
            <AiOutlineClose
              onClick={() => dispatch(toggleMobNavOpen())}
              className='text-3xl active:scale-95 transition-all duration-300 cursor-pointer z-50'
            />
            :
            <AiOutlineMenu
              onClick={() => dispatch(toggleMobNavOpen())}
              className='text-3xl active:scale-95 transition-all duration-300 cursor-pointer z-50'
            />
        }
      </div>


      <div className='w-screen hidden py-4 bg-transparent md:flex items-center justify-between gap-4 text-teal-100 border-b border-slate-800 mb-3 z-1000 px-5 md:px-20'>
        <div className='flex items-center justify-between gap-4' >
          <img className='w-10' src={weblogo} alt="weblogo" />
          <div className='text-2xl font-bold'>POD-X</div>
        </div>
        <div>
          <NavLink to='/user/podcasts' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Podcasts</NavLink>
          <NavLink to='/user/create-podcast' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Create Podcast</NavLink>
          <NavLink to='/user/details' className={'py-2 px-2 rounded-lg hover:bg-stone-900 transition-all duration-300 text-[16px] font-medium'}>Profile</NavLink>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  )
}

export default UserNav