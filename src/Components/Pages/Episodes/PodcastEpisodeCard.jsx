import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAudio, setIsPlayerVisible, setCurrentPlayer, toggleIsPlaying } from '../../../slices/audioSlice'
import {TbPlayerStop} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const PodcastEpisodeCard = ({bannerImg, title, audioInfoObj}) => {

  // Getting the navigate and dispatch refs
  const navigate = useNavigate()
  const dispatch = useDispatch();

  // Getting the states
  const isPlayerVisible = useSelector((state) => state.audioSlice.isPlayerVisible);
  const currentAudio = useSelector((state) => state.audioSlice.currentAudio);
  const isPlaying = useSelector((state) => state.audioSlice.isPlaying);

  const handleEpisodePlayBtnClick = () => {

    // Checking if someone is clicking the same audio card again
    if(currentAudio.id === audioInfoObj.id) return;

    // Setting the current audio
    dispatch(setCurrentAudio(audioInfoObj));

    // Checking if someone is clicking the same audio card again making the isPlaying false to toggle icon
    if (isPlaying) {
      dispatch(toggleIsPlaying())
    }

    // Setting the current player as small
    dispatch(setCurrentPlayer('small'));


    // Making the player visible
    if (!isPlayerVisible) {
      dispatch(setIsPlayerVisible())
    }

  }


  const handleFullScreenClick = () => {

    // Setting the current audio
    dispatch(setCurrentAudio(audioInfoObj))
    // Setting the current player as fullscreen
    dispatch(setCurrentPlayer('fullscreen'))
    // navigating to the full screen
    navigate(`/user/podcasts/episode/${currentAudio.id}`)

  }

  return (
    <motion.div 
    initial={{ y: 50}}
    animate={{ y: 0}}
    transition={{ duration: 0.5}}
    className='md:w-96 md:h-72 w-full h-96 border-gray-900 border-2 bg-zinc-950 hover:bg-zinc-900 transition-all duration-300 cursor-pointer flex flex-col items-start justify-between p-5 rounded-xl overflow-hidden'>
        <img 
        className='w-full h-3/4 object-cover rounded-lg mb-2'
        src={bannerImg} alt="episode" />
        <div className='w-full flex items-center justify-between gap-4'>
          <p className='md:text-lg text-sm font-bold text-gray-500'>{title}</p>
          <div className='flex items-center justify-center gap-2'>
          <AiFillPlayCircle
          onClick={handleEpisodePlayBtnClick}
          className='text-5xl rounded-full shadow-sm shadow-black text-green-500 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
          />
          <TbPlayerStop
          onClick={handleFullScreenClick}
          className='text-5xl rounded-full shadow-sm shadow-black text-green-500 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
          />
        </div>
        </div>
        
    </motion.div>
  )
}

export default PodcastEpisodeCard