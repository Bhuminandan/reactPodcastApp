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
import { motion } from 'framer-motion'
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


  const handleSortChange = (e) => {
    const value = e.target.value;

    console.log(podcasts);

    
    if (value === 'popular') {
      let newArr = [...podcasts];
      newArr.sort((a, b) => {
        const totalViewsA = a.views.map((viewsObj) => viewsObj.views).reduce((acc, curr) => acc + curr, 0);
        const totalViewsB = b.views.map((viewsObj) => viewsObj.views).reduce((acc, curr) => acc + curr, 0);
        return totalViewsB - totalViewsA;
      });
      setFilteredProducts(newArr)

  } else if (value === 'random') {

      let newArr = [...podcasts];
      setFilteredProducts(newArr)

      setFilteredProducts(newArr)
    } else if (value === 'newest') {
      let newArr = [...podcasts]
      setFilteredProducts(newArr.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)))
    } else if (value === 'oldest') {
      let newArr = [...podcasts]
      setFilteredProducts(newArr.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn)))
    }
  }
  
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
            <div className='w-full gap-10 flex-wrap md:flex-row flex-col text-2xl relative text-white flex items-start  md:items-center justify-start md:justify-between cursor-pointer mb-20'>
            <div className='w-1/2'>
              <PageHeader 
                title='Podcast Collections'
              />
            </div>
              <motion.div 
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
              className='w-32 h-32 text-sm absolute top-20 self-end left-0 md:right-1 mt-10'>
                <select onChange={handleSortChange} name="random" id="sort" className='w-full h-10 px-2 py-2 outline-none border rounded-lg bg-black cursor-pointer'>
                  <option value="popular">Popular</option>
                  <option value="random">Randome</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </motion.div>
            </div>
            {
              <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                   filteredPodcasts.length !== 0 ? 
                   filteredPodcasts?.map((podcast, index) => {
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
                        index={index}
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