import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import showSuccessToast from '../../../Util/showSuccessToast'


const PodcastCard = ({bannerImg, title, desc, id, creatorName, createdOn, isUserLiked}) => {

  // Getting the navigate
  const navigate = useNavigate()

  // Triming the string if it is longer
  const trimString = (str, n) => {
    return str.length > n ?  str.substring(0, n) + '...' : str.substring(0, n) ;
  }

  // Getting the user
  let user = useSelector((state) => state.userSlice.user)

  // Getting the dispatch ref
  const dispath = useDispatch();

  // On card click handler
  const handleCardClick = () => {

    // Navigating to user to the clicked podcast with id in the url
    navigate(`/user/podcasts/${id}`)
  }

  // Like click handler
  const handleLikeClick = async (e) => {

    // Preventing the default behaviour
    e.stopPropagation() 

    // If the user is already liked the podcast then remove it
    if (isUserLiked) {
      showSuccessToast('Removed from favorites', 1000)
      
      // Getting the updated list
      const updatedList = user.favorites?.filter((item) => {
        return item !== id
      })

      // Updating the user doc
      await updateDoc(doc(db, 'users', user.uid), {
        favorites: updatedList
      })

      // Updating the redux state
      dispath(setUser({
        ...user,
        favorites: updatedList
      }))


    } else {

      // Adding the podcast to the user's favorites
      showSuccessToast('Added to favorites', 1000)

      // Updating the user doc
      await updateDoc(doc(db, "users", user?.uid), {
        favorites: [...user.favorites, id]
      })

      // Updating the redux state
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