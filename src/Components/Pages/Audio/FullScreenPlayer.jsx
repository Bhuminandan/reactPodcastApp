import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import GenresDisplay from '../../Common/GenresDisplay';

const FullScreenPlayer = () => {


  // Getting the current audio
  const currentAudio = useSelector((state) => state.audioSlice.currentAudio);

  // Getting elements from the current audio by destructuring
  const { bannerImg, audioFile, episodDesc, episodTitle, favoriteGenres} = currentAudio;

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-start mt-10 px-10'>
            <div>
              <img src={bannerImg} alt="banner" className='w-full h-56 object-cover rounded-xl shadow-xl shadow-slate-800'/>
            </div>
            <div className='mt-10 flex flex-col items-center justify-center'>
              <h2 className='text-2xl text-slate-600 font-bold self-start'>{episodTitle}</h2>
              <AudioPlayer
                src={audioFile}
                autoPlay
                />
            </div>
            <div className='md:mt-40 w-full h-[1px] bg-gray-700 mt-10'>
            </div>
            <div className='mt-10 text-slate-500 w-full h-auto font-semibold text-2xl'>
              Description
            </div>
              <div className='mt-10 self-start text-sm text-slate-500 max-w-screen-sm overflow-hidden h-auto'>
                {episodDesc}
              </div>
              {
                <div className='mt-10 flex items-start justify-start gap-4 flex-wrap  max-w-screen-sm self-start'>
                  { 
                  favoriteGenres && favoriteGenres.map((genre) => {
                      return <GenresDisplay key={genre} genreText={genre}/>
                    }) 
                  }
                </div>
              }
          </div>
  )
}

export default FullScreenPlayer