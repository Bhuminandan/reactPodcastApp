import React from 'react'
import PageHeader from '../../Common/PageHeader'
import { useSelector } from 'react-redux'
import PodcastCard from '../Podcasts/PodcastCard'
import timeCalculator from '../../../Util/tImeCalculator'
import emptyIll from '../../../data/illustrations/emptyIll.svg'

const Favorites = () => {


    // Getting the user favorites and podcasts from the redux
    const favorites  = useSelector((state) => state.userSlice.user.favorites)
    const podcasts = useSelector((state) => state.podcastsSlice)


  return (
    <div className=' max-w-screen-lg m-auto min-h-screen flex flex-col items-start justify-start px-5'>
    <PageHeader
    title={'Favorites'}
    />
        <div className='flex items-start justify-start flex-wrap gap-4'>
         {
            favorites.length === 0 ?
            
                    <img
                    className='w-full mt-10 object-cover'
                    src={emptyIll} alt="empty" />
            :
                    podcasts?.filter((podcast) => favorites?.includes(podcast.id)).map((podcast) => {
                    return (
                        <PodcastCard
                        key={podcast.id}
                        bannerImg={podcast.bannerImg}
                        title={podcast.title}
                        desc={podcast.desc}
                        id={podcast.id}
                        creatorName={podcast?.creatorName}
                        createdOn={timeCalculator(podcast.createdOn)}
                        isUserLiked={true}
                        />
                    )
                })
         }
        </div>
    </div>

  )
}

export default Favorites