import React from 'react'
import { useNavigate } from 'react-router-dom'

const PodcastCard = ({bannerImg, title, desc, id}) => {

  const navigate = useNavigate()

  const trimString = (str, n) => {
    return str.length > n ?  str.substring(0, n) + '...' : str.substring(0, n) ;
  }

  const handleCardClick = () => {
    navigate(`/user/podcasts/${id}`)
  }

  return (
    <div className='flex flex-col items-start justify-start rounded-lg border-2 border-gray-600 bg-zinc-950 w-72 h-96 md:w-96 cursor-pointer hover:bg-zinc-900 transition-all duration-300 ease-in-out text-white overflow-hidden'
      onClick={handleCardClick}
    >
      <div className='w-full h-full rounded-lg p-5'>
        <img 
          src={bannerImg} 
          alt='Podcast card' 
          className='w-full h-56 object-cover rounded-xl'
        />
        <div className='text-xl font-bold my-4'>{trimString(title, 20)}</div>
        <div className='text-sm'>{trimString(desc, 100)}</div>
      </div>
    </div>
  )
}

export default PodcastCard