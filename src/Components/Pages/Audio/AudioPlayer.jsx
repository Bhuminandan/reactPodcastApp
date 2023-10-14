import React,  { useEffect, useRef, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsPlayerVisible, toggleIsPlaying, tooglgeIsMuted } from '../../../slices/audioSlice'
import { AiFillPlayCircle, AiFillPauseCircle, AiFillCloseCircle } from 'react-icons/ai'
import { BsFillFastForwardFill } from 'react-icons/bs'
import { IoPlayBack } from 'react-icons/io5'
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs'

const AudioPlayer = () => {

    const audioRef = useRef()

    const dispatch = useDispatch()
    const isPlaying = useSelector((state) => state.audioSlice.isPlaying)
    const currentAudio = useSelector((state) => state.audioSlice.currentAudio)
    const isMuted = useSelector((state) => state.audioSlice.isMuted)

    const [audioDuration, setAudioDuration] = useState(0);
    const [currentDuration, setCurrentDuration] = useState(0);

    const handleTimeUpdata = (e) => {
        setCurrentDuration(Number(e.target.currentTime));
        setAudioDuration(Number(e.target.duration));
    }

    const handleLoadMetaDeta = (e) => {
        setCurrentDuration(Number(e.target.duration));
    }

    const handleEnded = () => {
        dispatch(toggleIsPlaying())
    }

    useEffect(() => {

        const audio = audioRef.current;

        audio.addEventListener('timeupdate', (e) => handleTimeUpdata(e))
        audio.addEventListener('loadedmetadata', (e) => handleLoadMetaDeta(e))
        audio.addEventListener('ended', (e) => handleEnded(e))

        return () => {
            audio.removeEventListener('timeupdate', (e) => handleTimeUpdata(e))
            audio.removeEventListener('loadedmetadata', (e) => handleLoadMetaDeta(e))
            audio.removeEventListener('ended', (e) => handleEnded(e))
        }
    }, [])


    const handlePlayPauseClick = () => {
        if (!isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        dispatch(toggleIsPlaying())
    }


    const handleMuteClick = () => {
        if (!isMuted) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = 1;
        }
        dispatch(tooglgeIsMuted())
    }

    const handleDurationChange = (currentAudioTime) => {
        audioRef.current.currentTime = currentAudioTime;
    }

    const handleForWardClick = (increasedTime) => {
        const updatedTime =  audioRef.current.currentTime + increasedTime;
        if (updatedTime < audioDuration) {
            audioRef.current.currentTime = updatedTime;
        }
    }

    const handleBackWardClick = (decreasedTime) => {
        const updatedTime =  audioRef.current.currentTime - decreasedTime;
        if (updatedTime > 0 && updatedTime < audioDuration) {
            audioRef.current.currentTime = updatedTime;
        }
    }

  return (
    <div className='w-screen rounded-t-lg h-16 md:h-20 shadow shadow-teal-100 bottom-0 fixed bg-gradient-to-r from-teal-800 via-teal-950 to-black'>
        <div className='md:max-w-screen-xl h-full md:px-10 px-5 m-auto flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <img 
                    className='w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg shadow-md shadow-teal-900 cursor-pointer mr-2'
                    src={currentAudio.bannerImg} 
                    alt="Auio banner" 
                />
                <h4 className='text-white text-lg font-medium hidden sm:flex'>{currentAudio.episodTitle}</h4>
            </div>

            <div className='flex items-center gap-5'>
                <div>
                    <IoPlayBack 
                    onClick={() => handleBackWardClick(5)}
                    className='text-2xl ml-2 rounded-full text-green-200 hover:scale55 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                </div>
                {
                    isPlaying ? 
                    <AiFillPlayCircle
                    onClick={handlePlayPauseClick}
                    className='text-5xl rounded-full shadow-sm border border-green-100 text-green-300 hover:shadow-green-200 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    /> 
                    :
                    <AiFillPauseCircle
                    onClick={handlePlayPauseClick}
                    className='text-5xl rounded-full shadow-sm border border-green-100 text-green-300 hover:shadow-green-200 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                }
                 <div>
                    <BsFillFastForwardFill 
                    onClick={() => handleForWardClick(5)}
                    className='text-2xl mr-2 rounded-full text-green-200 hover:scale-105 duration-300 transition-all cursor-pointer active:transform active:translate-y-1'
                    />
                </div>
            <div className='items-center gap-5 text-green-300 font-medium hidden md:flex'>
               
               <div className='items-center gap-5 text-green-300 font-medium hidden md:flex'>

                <p>{currentDuration.toFixed(0)}</p>
                    <audio 
                        ref={audioRef}
                        autoPlay
                        src={currentAudio.audioFile} 
                        className='hidden'
                        muted={isMuted}
                        >
                    </audio>

                <input 
                    type='range'
                    min={0}
                    max={audioDuration}
                    value={currentDuration}
                    step={1}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    className='lg:w-96 md:w-36 cursor-pointer slider'
                />

                <p>{audioDuration.toFixed(0)}</p>
               </div>
            </div>
               <div className='flex items-center mr-2 text-green-300 '>
                {
                    isMuted ? 
                    <BsFillVolumeMuteFill
                    onClick={() => handleMuteClick()}
                    className='text-2xl mr-2 rounded-full shadow-sm cursor-pointer active:transform active:translate-y-1'
                    /> : 
                    <BsFillVolumeUpFill
                    onClick={() => handleMuteClick()}
                    className='text-2xl mr-2 rounded-full shadow-sm cursor-pointer active:transform active:translate-y-1'
                    />
                }
                <input 
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(e) => audioRef.current.volume = e.target.value}
                    className='lg:w-20 md:w-14 cursor-pointer slider hidden md:flex'
                />
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