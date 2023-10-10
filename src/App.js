import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Profile from './Components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import { doc } from 'firebase/firestore'
import { db } from './firebase'
import { useDispatch } from 'react-redux'
import { setUser } from './slices/userSlice'
import { onSnapshot } from 'firebase/firestore';

function App() {

  const dispatch = useDispatch()

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
      }
    })

    return () => {
      unSubscribeAuth()
    }
  }, [])

  return (
    <div className="w-screen pb-10 min-h-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-900 via-black to-black">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
