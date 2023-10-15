import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomeBtn from '../Common/CustomeBtn';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import PageLoader from '../Common/PageLoader';
import PodcastCard from './PodcastCard';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../../slices/podcastsSlice';
import timeCalculator from '../../Util/tImeCalculator';
import { useNavigate } from 'react-router-dom';

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
      toast.success('Logged Out Successfully')      
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  }

  const handleEditProfile = () => {
    navigate(`/user/${user.uid}/edit-profile`)
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
      
      <img
      className='w-32 h-32 rounded-full object-cover' 
      src={user?.profilePic} 
      alt="profile" />

      <h1 className='text-2xl font-bold text-gray-100'>{user.name}</h1>
      <p className='text-gray-400'>{user.email}</p>
      <div className='flex items-center justify-between gap-2'>
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
                  userPodcasts && 
                  userPodcasts.map((podcast) => {
                    console.log('Getting called in userPodcasts');
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
                }
              </div>
          </div>
      </div>

      
    </div>
  )
}

export default Profile