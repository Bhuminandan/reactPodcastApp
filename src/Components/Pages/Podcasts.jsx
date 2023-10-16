import React, { useState } from 'react'
import { useEffect } from 'react'
import PageLoader from '../Common/PageLoader'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { setPodcasts } from '../../slices/podcastsSlice'
import { toast } from 'react-toastify'
import PodcastCard from './PodcastCard'
import timeCalculator from '../../Util/tImeCalculator'


const Podcasts = () => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const podcasts = useSelector((state) => state.podcastsSlice)
  const user = useSelector((state) => state.userSlice.user)
  console.log(user);
 
  useEffect(() => {
    setIsLoading(true);
    try {
      onSnapshot(
        query(collection(db, 'podcasts')),
        (querySnapshot) => {
          const podcastsData = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
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

  if(isLoading) {
    return (
      <div>
        <PageLoader/>
      </div>
    )
  }

  return (
   <div>
          <div className=' max-w-screen-xl m-auto min-h-screen flex flex-col items-start justify-start px-10 mb-40'>
            <h1 className='md:text-4xl text-2xl text-gray-600 font-bold mt-10 mb-5'>Podcasts</h1>
            {
              <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                  podcasts.map((podcast) => {
                    console.log(podcast);
                    return (
                      <PodcastCard
                        key={podcast.id}
                        bannerImg={podcast.bannerImg}
                        title={podcast.title}
                        desc={podcast.desc}
                        id={podcast.id}
                        creatorName={podcast?.creatorName}
                        createdOn={timeCalculator(podcast.createdOn)}
                        />
                    )
                  })
                }
              </div>
            }
          </div>
   </div>
  )
}

export default Podcasts