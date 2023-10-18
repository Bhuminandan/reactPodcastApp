import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import GenresDisplay from '../../Common/GenresDisplay';

const FullScreenPlayer = () => {


  const currentAudio = useSelector((state) => state.audioSlice.currentAudio);
  const { bannerImg, audioFile, episodDesc, episodTitle, favoriteGenres} = currentAudio;

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-start mt-10 px-5'>
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
              <div className='mt-10 text-sm text-slate-500 max-w-screen-sm overflow-hidden h-auto'>
                {episodDesc}
              </div>
              {
                <div className='mt-10 flex items-start justify-start gap-4 flex-wrap  max-w-screen-sm'>
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