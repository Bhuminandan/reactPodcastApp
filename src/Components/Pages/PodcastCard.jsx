import React from 'react'
import { useNavigate } from 'react-router-dom'

const PodcastCard = ({bannerImg, title, desc, id, creatorName, createdOn}) => {

  const navigate = useNavigate()

  const trimString = (str, n) => {
    return str.length > n ?  str.substring(0, n) + '...' : str.substring(0, n) ;
  }

  const handleCardClick = () => {
    navigate(`/user/podcasts/${id}`)
  }

  return (
    <div className='flex flex-col items-start justify-between rounded-lg border-2 border-gray-600 bg-zinc-950 w-full h-auto md:min-h-[520px] md:w-96 cursor-pointer hover:bg-zinc-900 transition-all duration-300 ease-in-out text-white overflow-hidden py-4'
      onClick={handleCardClick}
    >
      <div className='w-full h-full rounded-lg p-5'>
        <img 
          src={bannerImg} 
          alt='Podcast card' 
          className='w-full h-56 object-cover rounded-xl'
        />
        <div className='text-xl font-bold my-4 flex items-center justify-between gap-2 flex-wrap mb-8 mt-8'>
          <div>
          {trimString(title, 20)}
          </div>
        <div className='text-sm py-2 px-4 rounded-lg bg-green-600 mt-2 sm:mt-0'
        onClick={handleCardClick}
        >
          Explore
        </div>
        </div>
        <div className='text-sm'>{trimString(desc, 100)}</div>
        <div className='flex items-center justify-between flex-wrap gap-4 mt-8'>
        {
          creatorName && (
            <div className='text-sm text-gray-600 font-semibold'>Creator: {trimString(creatorName, 10)}</div>
          )
        }
        {
          createdOn && (
            <div className='text-sm text-gray-600 font-semibold'>{createdOn}</div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default PodcastCard