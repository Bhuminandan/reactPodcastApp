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
import { ToastContainer, toast } from 'react-toastify';
import React, { Suspense, lazy } from 'react';
import PageLoader from './Components/Common/PageLoader';
import Privacy from './Components/Pages/Legal/Privacy';
import LandingPage from './Components/Pages/Landing/LandingPage';
import Navbar from './Components/Common/Navbar';
import Favorites from './Components/Pages/UserItems/Favorites';


// Importing compoents lazyly
const Signup = lazy(() => import('./Components/Auth/Signup'))
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
const GenresPage = lazy(() => import('./Components/Pages/Genres/GenresPage'));




function App() {

  const dispatch = useDispatch()

  // Getting the player info
  const isPlayerVisible = useSelector((state) => state.audioSlice.isPlayerVisible)
  const currentPlayer = useSelector((state) => state.audioSlice.currentPlayer)


  // Checking if the user is logged in
  useEffect(() => {

    // onAuthStateChanged is firebase function to check if the user is logged in
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {

      // If the user is logged in
      if (user) {

        // Getting the user details
        // onsnapshot is a firebase function to get the user details from the database when the user is logged in
        const unsubscribeSnapshot = onSnapshot(
          doc(db, 'users', user.uid),
          (userDoc) => {
            // If the user is found
            if (userDoc.exists()) {
              const userData = userDoc.data();

              // Saving the user details in the redux
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                profilePicUrl: userData.profilePic,
                uid: userData.uid,
                favorites: userData.favorites
              }));

            }
          },
          // Handling the error gracefully
          (error) => {
            console.log(error);
            toast.error('Something went wrong')
          }

        )

        // Cleanup function
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
    <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-950 via-black to-black">

      {/* Suspense fallback for the all pages due to lazy loading */}

      <Suspense fallback={<PageLoader />}>

        {/* ToastContainer */}
        <ToastContainer />

        {/* Placing the audio play here to make it available for all the pages */}
        {
          isPlayerVisible && currentPlayer === 'small' && <AudioPlayer />
        }

        {/* Routing for all the pages */}
        <Routes>

          {/* Nested Routing of unauthenticated pages */}
          <Route path='/' element={<Navbar />} >
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path='forgot-pass' element={<ForgotPass />} />
            <Route path='privacy-policy' element={<Privacy />} />
          </Route>

          {/* Nested Routing of authenticated pages */}
          <Route element={<PrivateRoutes />} >
            <Route path="/user" element={<UserNav />} >
              <Route path='genres/:genre' element={<GenresPage />} />
              <Route path="" element={<Podcasts />} />
              <Route path=':id/edit-profile' element={<EditProfilePage />} />
              <Route path="podcasts" element={<Podcasts />} />
              <Route path="podcasts/:id" element={<PodcastDetails />} />
              <Route path='podcasts/episode/:id' element={<FullScreenPlayer />} />
              <Route path="podcasts/:id/create" element={<CreateEpisodPage />} />
              <Route path="details" element={<Profile />} />
              <Route path='create-podcast' element={<CreatePodcast />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='privacy-policy' element={<Privacy />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
