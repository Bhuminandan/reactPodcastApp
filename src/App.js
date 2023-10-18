import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import { doc } from 'firebase/firestore'
import { db } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './slices/userSlice'
import { onSnapshot } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import React, { Suspense, lazy } from 'react';
import Loader from './Components/Common/Loader';

const Auth = lazy(() => import('./Components/Auth/Auth'));
const Login = lazy(() => import('./Components/Auth/Login'));
const Profile = lazy(() => import('./Components/Pages/Profile/Profile'));
const AudioPlayer = lazy(() => import('./Components/Pages/Audio/AudioPlayer'));
const PrivateRoutes = lazy(() => import('./Components/Pages/PrivateRoutes/PrivateRoutes'));
const UserNav = lazy(() => import('./Components/Pages/Navigation/UserNav'));
const EditProfilePage = lazy(() => import('./Components/Pages/Profile/EditProfilePage'));
const PodcastDetails = lazy(() => import('./Components/Pages/Podcasts/PodcastDetails'));
const CreateEpisodPage = lazy(() => import('./Components/Pages/Episodes/CreateEpisodPage'));
const CreatePodcast = lazy(() => import('./Components/Pages/Podcasts/CreatePodcast'));
const Podcasts = lazy(() => import('./Components/Pages/Podcasts/Podcasts'));
const ForgotPass = lazy(() => import('./Components/Auth/ForgotPass'));
const FullScreenPlayer = lazy(() => import('./Components/Pages/Audio/FullScreenPlayer'));




function App() {

  const dispatch = useDispatch()
  const isPlayerVisible = useSelector((state) => state.audioSlice.isPlayerVisible)
  const currentPlayer = useSelector((state) => state.audioSlice.currentPlayer)

  useEffect(() => {

    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {

      if (user) {

        const unsubscribeSnapshot = onSnapshot(

          doc(db, 'users', user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                profilePic: userData.profilePic,
                uid: userData.uid
              })
              );
            }
          },
          (error) => {
            console.log(error);
          }
        )
        return () => {
          unsubscribeSnapshot()
        }
      }
    })

    return () => {
      unSubscribeAuth()
    }
  }, [dispatch])

  return (
    <div className="w-screen pb-10 min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-950 via-black to-black">
      <ToastContainer />
      {
        isPlayerVisible && currentPlayer === 'small' && <AudioPlayer />
      }
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot-pass' element={<ForgotPass />} />
          <Route element={<PrivateRoutes />} >
            <Route path="/user" element={<UserNav />} >
              <Route path="" element={<Podcasts />} />
              <Route path=':id/edit-profile' element={<EditProfilePage />} />
              <Route path="podcasts" element={<Podcasts />} />
              <Route path="podcasts/:id" element={<PodcastDetails />} />
              <Route path='podcasts/episode/:id' element={<FullScreenPlayer />} />
              <Route path="podcasts/:id/create" element={<CreateEpisodPage />} />
              <Route path="details" element={<Profile />} />
              <Route path='create-podcast' element={<CreatePodcast />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
