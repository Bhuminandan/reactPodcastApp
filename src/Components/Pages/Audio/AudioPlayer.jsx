import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsPlayerVisible, toggleIsPlaying } from '../../../slices/audioSlice'
import { AiFillPlayCircle, AiFillPauseCircle, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillFastForwardFill } from 'react-icons/bs'
import { IoPlayBack } from 'react-icons/io5'

const AudioPlayer = ({audioSrc}) => {

    const dispatch = useDispatch()
    const isPlaying = useSelector((state) => state.audioSlice.isPlaying)
    const currentAudio = useSelector((state) => state.audioSlice.currentAudio)
    console.log(currentAudio);

  return (
    <div className='w-screen rounded-t-lg h-16 md:h-20 shadow shadow-teal-200 bottom-0 fixed bg-gradient-to-r from-teal-800 via-teal-950 to-black'>
        <div className='md:max-w-screen-xl h-full md:px-10 px-5 m-auto flex items-center justify-between'>
                <img 
                    className='w-10 h-10 object-cover rounded-full shadow-md shadow-green-200 cursor-pointer'
                    src={currentAudio.bannerImg} alt="Auio banner" 
                />

            <div className='flex items-center gap-5'>
                <div>
                    <IoPlayBack 
                    className='text-2xl rounded-full text-green-200 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                </div>
                {
                    isPlaying ? 
                    <AiFillPlayCircle
                    onClick={() => dispatch(toggleIsPlaying())}
                    className='text-5xl rounded-full shadow-sm border border-green-100 text-green-300 hover:shadow-green-200 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    /> 
                    :
                    <AiFillPauseCircle
                    onClick={() => dispatch(toggleIsPlaying())}
                    className='text-5xl rounded-full shadow-sm border border-green-100 text-green-300 hover:shadow-green-200 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                }
                 <div>
                    <BsFillFastForwardFill 
                    className='text-2xl rounded-full text-green-200 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                </div>
            <div className='items-center gap-5 text-green-300 font-medium hidden md:flex'>
               
                <p>1:10</p>
                    <audio src={currentAudio.audioFile} controls className='hidden'></audio>
                    <input 
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                    className='w-96 cursor-pointer slider'
                />

                <p>10:10</p>
            </div>
            </div>

            <AiFillCloseCircle
            onClick={() => dispatch(setIsPlayerVisible())}
            className='text-5xl rounded-full shadow-sm shadow-black text-green-300 hover:border hover:border-teal-600 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
            />

        </div>
    </div>
  )
}

export default AudioPlayer