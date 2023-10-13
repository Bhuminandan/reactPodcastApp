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


const PodcastDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [podcast, setPodcast] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const podcastsEpisodes = useSelector((state) => state.podcastEpisodes)
    const podcasts = useSelector((state) => state.podcastsSlice)
    console.log(podcasts); 

    const { id } = useParams();
    console.log(id);


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
                <div className='mt-10'>
                    <h3 className='mt-10 text-2xl font-bold'>Episodes</h3>
                    <div className='flex items-start justify-start flex-nowrap overflow-auto'>
                        {
                            podcastsEpisodes.map((episod) => {
                                return (
                                    <div className='flex items-start justify-start w-72 h-96 md:w-96 cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out text-white overflow-hidden'
                                    key={episod.id}
                                    >
                                        <img
                                        className='w-full h-full object-cover'
                                        src={episod.bannerImg}
                                        alt="episod"
                                        />
                                        <div className='ml-2'>
                                            <h3 className='text-lg font-bold'>{episod.title}</h3>
                                            <p className='text-sm'>{episod.desc}</p>
                                        </div>
                                    </div>  
                                )
                            })
                            
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default PodcastDetails