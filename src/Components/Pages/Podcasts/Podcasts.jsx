import React, { useState } from 'react'
import { useEffect } from 'react'
import PageLoader from '../../Common/PageLoader'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../firebase'
import { setPodcasts } from '../../../slices/podcastsSlice'
import { toast } from 'react-toastify'
import PodcastCard from './PodcastCard'
import timeCalculator from '../../../Util/tImeCalculator'
import PageHeader from '../../Common/PageHeader'
import Search from '../../Common/Search'

const Podcasts = () => {
  
  const dispatch = useDispatch()

  // Getting the podcasts
  const podcasts = useSelector((state) => state.podcastsSlice)
  const favorites = useSelector((state) => state.userSlice.user?.favorites)

  // States for the search and loading
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPodcasts, setFilteredProducts] = useState(podcasts)

  // Filter useEffect
  useEffect(() => {
    setFilteredProducts(podcasts)
  }, [podcasts])

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
      setIsLoading(false);
    }

  }, [dispatch])


  useEffect(() => {}, [favorites, podcasts, filteredPodcasts])

  
  if(isLoading) {
    return (
      <div>
        <PageLoader/>
      </div>
    )
  }

  return (
   <div>
          <div className=' max-w-screen-xl m-auto min-h-screen flex flex-col items-start justify-start px-5 mb-40'>
            <Search
              searchFrom={podcasts}
              onChange={setFilteredProducts}
            />
            <PageHeader 
              title='Podcasts Collections'
            />
            {
              <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                   filteredPodcasts.length !== 0 ? 
                   filteredPodcasts?.map((podcast) => {
                    console.log(favorites);
                    console.log(favorites.includes(podcast.id))
                    return (
                      <PodcastCard
                        key={podcast.id}
                        bannerImg={podcast.bannerImg}
                        title={podcast.title}
                        desc={podcast.desc}
                        id={podcast.id}
                        creatorName={podcast?.creatorName}
                        createdOn={timeCalculator(podcast.createdOn)}
                        isUserLiked={favorites?.includes(podcast.id)}
                        />
                    )
                  })
                  :
                  <div className='text-xl text-white'>
                      No results...
                  </div>
                }
              </div>
            }
          </div>
   </div>
  )
}

export default Podcasts