import React,  { useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase'; 
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomeBtn from '../Common/CustomeBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcastEpisodes } from '../../slices/podcastsEpisodesSlice';
import emptyIllustration from '../../data/illustrations/emptyIll.svg'
import PodcastEpisodeCard from './PodcastEpisodeCard';
import AudioPlayer from './Audio/AudioPlayer';
import GenresDisplay from '../Common/GenresDisplay';


const PodcastDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [podcast, setPodcast] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentAudio, setCurrentAudio] = useState('');
    console.log(currentAudio);


    
    const podcastsEpisodes = useSelector((state) => state.podcastEpisodes)
    const { id } = useParams();


     useEffect(() => {
        if (id) {
            getData()
        }
    }, [id]);

    const getData = async () => {
        try {
                const docRef = doc(db, "podcasts", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data()); 
                    setPodcast(docSnap.data());                   
                } else {
                    console.log('Document does not exist');
                    toast.error('Something went wrong')
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong')
            }
        };

        const handleCreateEpisode = () => {
            navigate(`/user/podcasts/${id}/create`)
        }
    
      useEffect(() => {
        setIsLoading(true);
        try {
          onSnapshot(
            query(collection(db, 'podcasts', id, 'episods')),
            (querySnapshot) => {
              const podcastEpisodesData = []
              querySnapshot.forEach((doc) => {
                console.log(doc.data());
                podcastEpisodesData.push({ ...doc.data(), id: doc.id })
              })
              dispatch(setPodcastEpisodes(podcastEpisodesData))
            }
          )
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
          setIsLoading(false);
        }
    
      }, [dispatch])

      
    

  return (
    <div>
        {
            <div className='max-w-screen-xl m-auto px-5 md:px-10 text-gray-500 rounded-2xl overflow-hidden'>
                <div className='flex items-center justify-between flex-wrap gap-5'>

                <h1 className='text-2xl md:text-4xl font-bold text-gray-300 md:mt-10 '>{podcast.title}</h1>
                {
                    // Showind the create podcast button only to the author of the podcast collection
                    podcast.createdBy === auth.currentUser.uid && 
                        <div className='md:w-56'>
                        <CustomeBtn
                        type='button'
                        action={handleCreateEpisode}
                        btnText='Create Episode'
                        disabled={false}
                        />
                        </div>
                }
                </div>
                <img 
                className='mt-10 w-full h-72 object-cover opacity-80 rounded-2xl bg-black shadow-md shadow-teal-900'
                src={podcast.displayImg} 
                alt="banner" />
                <h3 className='mt-10 text-xl font-bold'>Podcast info</h3>
                <div className='mt-10 text-gray-400 w-full'>{podcast.desc}</div>
                <h3 className='mt-10 text-xl font-bold'>Genres</h3>
                <div className='flex items-start justify-start flex-wrap gap-2 mt-5'>
               {

                podcast.genres?.length !== 0 && podcast.genres?.map((genre) => {
                    return <GenresDisplay
                        genreText={genre}
                    />
                })
                
               }
                </div>
                <div className='mt-10 mb-40'>
                    <h3 className='mt-10 text-2xl font-bold mb-10'>Episodes</h3>
                    <div className='flex items-start justify-start flex-wrap gap-5'>
                        {
                           podcastsEpisodes.length !== 0 ? 
                           
                           podcastsEpisodes.map((episod) => {
                                return (
                                    <PodcastEpisodeCard
                                        key={episod.id}
                                        bannerImg={episod.bannerImg}
                                        title={episod.episodTitle}
                                        setClickedCardId={setCurrentAudio}
                                        audioInfoObj={episod}
                                    /> 
                                )
                            }) :
                            
                            <div className='w-full h-auto flex flex-col gap-10 items-center justify-center md:mt-20 md:mb-20'>
                                <img
                                className='w-96 h-full' 
                                src={emptyIllustration} 
                                alt="empty" />
                                <h3 className='text-xl text-green-600 font-medium'>No episodes yet...</h3>
                                {
                                    podcast.createdBy === auth.currentUser.uid && 
                                        <div className='md:w-56'>
                                        <CustomeBtn
                                        type='button'
                                        action={handleCreateEpisode}
                                        btnText='Create First Episode'
                                        disabled={false}
                                        />
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default PodcastDetails