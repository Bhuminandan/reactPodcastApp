import React from 'react'
import playlistCover from '../../data/Playlist cover 🫶.jpg'
import CustomeBtn from '../Common/CustomeBtn'
import { useNavigate } from 'react-router-dom'
import WaveAnimation from '../Common/WaveAnimation'

const Home = () => {

    // Getting navigate ref
    const navigate = useNavigate();


  return (
    <>
    <div className=' max-w-screen-xl min-h-screen m-auto flex items-start md:pt-40 pb-72 justify-between md:flex-nowrap flex-wrap-reverse pt-5 gap-5 md:gap-20 px-5 '>
        <div className='md:w-1/2 w-full text-xl md:text-4xl text-gray-700 font-bold md:p-20'>
            <pre>
                Knowldge should be <span className='text-green-200 underline'>FREE</span>
            </pre>
            <div className='text-gray-600 md:text-lg text-sm mt-4 mb-4'>
                POD-X to captivating stories, insightful talks, and the magic of sound. Dive into a world of audio wonder.
            </div>
            <div className='w-50 h-5'>
                <CustomeBtn
                btnText={'Signup for free'}
                action={() => navigate('/signup')}
                />
            </div>
        </div>
        <div className='md:w-1/2 w-full'>
            <img 
            className='rounded-2xl'
            src={playlistCover} alt="beach day" />
        </div>
    </div>
    <div className='w-screen bottom-0 md:flex fixed hidden'>
        {/* Wave animation */}
        <WaveAnimation/>
    </div>
    </>
  )
}

export default Home