import React, { useEffect } from 'react'
import PageHeader from '../Components/Common/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import PodcastCard from '../Components/Pages/Podcasts/PodcastCard'
import emptyIll from '../data/illustrations/emptyIll.svg'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { setPodcasts } from '../slices/podcastsSlice'
import { toast } from 'react-toastify'

const GenresPage = () => {


    const dispatch = useDispatch()

    const currentGenre = useSelector((state) => state.genreSlice.genre)
    const podcasts = useSelector((state) => state.podcastsSlice)
    const favorites = useSelector((state) => state.userSlice.user?.favorites)   
    
    useEffect(() => {
        try {
          onSnapshot(
            query(collection(db, 'podcasts')),
            (querySnapshot) => {
              const podcastsData = []
              querySnapshot.forEach((doc) => {
                podcastsData.push({ ...doc.data(), id: doc.id })
              })
              dispatch(setPodcasts(podcastsData))
            }
          )
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
    
      }, [dispatch])


  return (
        currentGenre ? 
        <>     
            <div className='min-h-screen max-w-screen-lg flex flex-col items-start justify-start flex-wrap gap-2 m-auto px-10'>
                <div className='flex items-center justify-center gap-2'>
                <PageHeader
                title={'Genres: '}
                />
                <span className='text-green-400 font-bold md:text-lg text-sm mt-2'>{currentGenre}</span>
        
                {
        
                }
                </div>
                <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                    podcasts.filter((podcast) => podcast.genres.includes(currentGenre)).map((podcast) => {
                        return (
                            <PodcastCard
                            key={podcast.id}
                            bannerImg={podcast.bannerImg}
                            title={podcast.title}
                            desc={podcast.desc}
                            id={podcast.id}
                            isUserLiked={favorites?.includes(podcast.id)}
                            />
                        )
                    })
                }
                </div>
            </div> 
        </>
            : 
        <div className='min-h-screen max-w-screen-sm flex flex-col items-center justify-center flex-wrap gap-2 m-auto px-10'>
            <p className='text-gray-400 mb-5'>No podcasts exists in this genre...</p>
            <img src={emptyIll} alt="empty" />
        </div>
  )
}

export default GenresPage