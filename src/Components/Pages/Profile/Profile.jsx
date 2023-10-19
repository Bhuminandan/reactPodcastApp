import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomeBtn from '../../Common/CustomeBtn';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { toast } from 'react-toastify';
import PageLoader from '../../Common/PageLoader';
import PodcastCard from '../Podcasts/PodcastCard';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../../../slices/podcastsSlice';
import timeCalculator from '../../../Util/tImeCalculator';
import { useNavigate } from 'react-router-dom';
import emptyill from '../../../data/illustrations/emptyIll.svg'
import PageHeader from '../../Common/PageHeader';

const Profile = () => {

  // Getting the user details and podcasts from the redux
  const user = useSelector((state) => state.userSlice.user)
  const podcasts = useSelector((state) => state.podcastsSlice)
  
  
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // State for the user's Podcasts
  const [userPodcasts, setUserPodcasts] = useState([])


  useEffect(() => {
    if (!podcasts) {
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
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  }, [dispatch, podcasts])

  // Getting the user's Podcasts
  useEffect(() => {
    if (podcasts && user) {
    const filteredPodcasts = podcasts.filter(podcast => podcast.createdBy === user.uid)
      setUserPodcasts(filteredPodcasts)
    }
  }, [podcasts, user, dispatch])


  // Sign Out Function 
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success('Logged Out Successfully',{
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })      
      navigate('/login')
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  }

  const handleEditProfile = () => {
    navigate(`/user/${user.uid}/edit-profile`)
  }

  const handleFavoritesClick = () => {
    navigate('/user/favorites')
  }


  // Showing loader while loading
  if (!user) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <PageLoader/>
      </div>
    )
  }

  // Profile Page
  return (
    <div className='w-screen min-h-screen flex flex-col items-start justify-start gap-2'>
    <div className='text-white md:w-3/4 w-full px-5 md:px-10 mt-10 m-auto flex flex-col gap-5 items-start justify-start'>
      <PageHeader
      title={'Profile'}
      mt={'0'}
      mb={'10'}
      />
      <img
      className='w-32 h-32 rounded-full object-cover' 
      src={user.profilePicUrl} 
      alt="profile" />

      <h1 className='text-2xl font-bold text-gray-100'>{user.name}</h1>
      <p className='text-gray-400'>{user.email}</p>
      <div className='flex items-center justify-between flex-wrap gap-2'>
      <div className='w-22'>
        <CustomeBtn
        type={'submit'}
        action={handleEditProfile}
        btnText={'Edit Profile'}
        disabled={false}
        />
      </div>
      <div className='w-22'>
        <CustomeBtn
        type={'submit'}
        action={handleFavoritesClick}
        btnText={'Favorites'}
        disabled={false}
        />
      </div>
      <div className='w-22'>
        <CustomeBtn
        type={'submit'}
        action={handleSignOut}
        btnText={'Logout'}
        disabled={false}
        />
      </div>
      </div>
      <div className='w-full h-auto'>
      <h1 className='md:text-4xl text-2xl text-gray-600 font-bold mt-10 mb-5'>Your Podcasts</h1>
              <div className='flex flex-wrap items-start justify-start gap-4'>
                {
                  userPodcasts.length !== 0 ? 
                  userPodcasts.map((podcast) => {
                    return (
                      <PodcastCard
                        key={podcast.id}
                        bannerImg={podcast.bannerImg}
                        title={podcast.title}
                        desc={podcast.desc}
                        id={podcast.id}
                        creatorName={podcast?.creatorName}
                        createdOn={timeCalculator(podcast?.createdOn)}
                      />
                    )
                  })
                  // type, action, btnText, disabled
                  :
                  <div className='flex flex-col items-center justify-center w-full mt-10'>
                    <img 
                    className='w-96'
                    src={emptyill} alt="empty" />

                    <div className='flex items-center justify-center mt-10 mb-20'>
                        <CustomeBtn
                        type={'submit'}
                        action={() => navigate('/user/create-podcast')}
                        btnText={'Create Your First Podcast'}
                        />
                    </div>
                  </div>
                }
              </div>
          </div>
      </div>
    </div>
  )
}

export default Profile