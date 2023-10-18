import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
const PodcastCard = ({bannerImg, title, desc, id, creatorName, createdOn, isUserLiked}) => {

  const navigate = useNavigate()

  const trimString = (str, n) => {
    return str.length > n ?  str.substring(0, n) + '...' : str.substring(0, n) ;
  }

  let user = useSelector((state) => state.userSlice.user)
  console.log(user);
  const dispath = useDispatch();

  const handleCardClick = () => {
    navigate(`/user/podcasts/${id}`)
  }

  const handleLikeClick = async (e) => {
    e.stopPropagation() 

    if (isUserLiked) {
      toast.success('Removed from favorites', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
      
      const updatedList = user.favorites?.filter((item) => {
        return item !== id
      })
      await updateDoc(doc(db, 'users', user.uid), {
        favorites: updatedList
      })


      dispath(setUser({
        ...user,
        favorites: updatedList
      }))


    } else {
      toast.success('Added to favorites', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
    })
      await updateDoc(doc(db, "users", user?.uid), {
        favorites: [...user.favorites, id]
      })

      dispath(setUser({
          ...user,
          favorites: [...user.favorites, id]
      }))
    }

}

  return (
    <div className='flex flex-col items-start justify-between rounded-lg border-2 border-gray-900 bg-zinc-950 w-full h-auto md:h-[520px] md:w-[400px] cursor-pointer hover:bg-zinc-900 transition-all duration-300 ease-in-out text-white overflow-hidden py-4'
      onClick={handleCardClick}
    >
      <div className='w-full h-full rounded-lg p-5 flex flex-col items-start justify-between'>
        <img 
          src={bannerImg} 
          alt='Podcast card' 
          className='w-full h-56 object-cover rounded-xl'
        />
        <div className='text-xl font-bold my-4 flex items-center justify-between gap-2 flex-wrap mt-8 w-full'>
          <div>
          {trimString(title, 20)}
          </div>
          <div className='flex items-center justify-center gap-2'>
            {
              isUserLiked ? 
              <AiFillHeart 
              onClick={(e) => handleLikeClick(e)}
              className='text-red-500 text-5xl p-2 rounded-full hover:bg-zinc-800 duration-300 transition-all'/>
              :
              <AiOutlineHeart 
              onClick={(e) => handleLikeClick(e)}
              className='text-white text-5xl p-2 rounded-full hover:bg-zinc-800 duration-300 transition-all'/>
            }
          <div className='text-sm py-2 px-4 rounded-lg bg-green-600 mt-2 sm:mt-0'
          onClick={handleCardClick}
          >
            Explore
          </div>
          </div>
        </div>
          <div className='text-sm'>{trimString(desc, 100)}</div>
          <div className='flex items-center justify-between flex-wrap gap-4 mt-8 h-auto w-full'>
          {
            creatorName && (
              <div className='text-sm text-slate-600 font-semibold'>Creator: {trimString(creatorName, 10)}</div>
            )
          }
          {
            createdOn && (
              <div className='text-sm text-slate-600 font-semibold'>{createdOn}</div>
            )
          }
          </div>
      </div>
    </div>
  )
}

export default PodcastCard