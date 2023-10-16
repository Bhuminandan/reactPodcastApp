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


const Podcasts = () => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const podcasts = useSelector((state) => state.podcastsSlice)
 
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
            <PageHeader 
              title='Podcasts Collections'
            />
            {
              <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                  podcasts.map((podcast) => {
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