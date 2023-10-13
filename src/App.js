import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import Profile from './Components/Pages/Profile';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import { doc } from 'firebase/firestore'
import { db } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './slices/userSlice'
import { onSnapshot } from 'firebase/firestore';
import PrivateRoutes from './Components/Pages/PrivateRoutes';
import CreatePodcast from './Components/Pages/CreatePodcast';
import Podcasts from './Components/Pages/Podcasts';
import UserNav from './Components/Pages/UserNav';
import PodcastDetails from './Components/Pages/PodcastDetails';
import CreateEpisodPage from './Components/Pages/CreateEpisodPage';
import AudioPlayer from './Components/Pages/Audio/AudioPlayer';

function App() {

  const dispatch = useDispatch()
  const isPlayerVisible = useSelector((state) => state.audioSlice.isPlayerVisible)
  const currentAudio = useSelector((state) => state.audioSlice.currentAudio)
  console.log(isPlayerVisible);

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
    <div className="w-screen pb-10 min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-900 via-black to-black">
      {
        isPlayerVisible &&
        <div className=' z-50'>
          < AudioPlayer
            audioSrc={currentAudio}
          />
        </div>
      }
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />} >
          <Route path="/user" element={<UserNav />} >
            <Route path="" element={<Podcasts />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="podcasts/:id" element={<PodcastDetails />} />
            <Route path="podcasts/:id/create" element={<CreateEpisodPage />} />
            <Route path="details" element={<Profile />} />
            <Route path='create-podcast' element={<CreatePodcast />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
