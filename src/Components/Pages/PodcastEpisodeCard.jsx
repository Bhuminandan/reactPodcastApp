import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAudio, setIsPlayerVisible } from '../../slices/audioSlice'

const PodcastEpisodeCard = ({bannerImg, title, audioInfoObj}) => {

  const dispatch = useDispatch();
  const isPlayerVisible = useSelector((state) => state.audioSlice.isPlayerVisible);

  const handleEpisodeCardClick = () => {
    console.log('Inside Edisode card');
    dispatch(setCurrentAudio(audioInfoObj));
    if (!isPlayerVisible) {
      dispatch(setIsPlayerVisible())
    }
  }

  return (
    <div className='md:w-96 md:h-72 w-72 h-96 border-gray-900 border-2 bg-zinc-950 hover:bg-zinc-900 transition-all duration-300 cursor-pointer flex flex-col items-start justify-between p-5 rounded-xl overflow-hidden'>
        <img 
        className='w-full h-3/4 object-cover rounded-lg'
        src={bannerImg} alt="episode" />
        <div className='w-full flex items-center justify-between'>
        <p className='text-xl font-bold text-gray-500'>{title}</p>
        <AiFillPlayCircle
        onClick={handleEpisodeCardClick}
        className=' text-5xl rounded-full shadow-sm shadow-black text-green-500 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
        />
        </div>
        
    </div>
  )
}

export default PodcastEpisodeCard