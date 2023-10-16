import React, { useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from '../Common/Navbar'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export const Login = () => {
//  imported dispatch and navigate
const dispatch = useDispatch()
const navigate = useNavigate()

// states
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)

// handle submit function
const handleSubmit = (e) => {
  e.preventDefault()

  // validation
  if (!email || !password ) {
    toast.error('Please fill all the fields', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
    
  }

  // signing up toast
  toast('🦄Loading ...', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  
  // signing in with fire base
  const handleSignIn = async () => {
    setIsLoading(true)

    try {
      // Signing in with inbuilt signin firebase hook
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userCredential.user;     
                
        // Saving user details
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data();

        console.log(userData)
        
        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          profilePicUrl:userData.profilePic,
          uid: userData.uid
        }))
        setIsLoading(false)

        // redirecting user to profile on successful signup
        navigate('/user/podcasts')
        
    } catch (error) {
          toast.error( 'Check email and Passward again...', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      setIsLoading(false)
    }

  }

  // calling handleSignIn
  handleSignIn();

  // Clearing the input fields
  setEmail('')
  setPassword('')
}


  return (
    <>
      <Navbar />
    <div className='flex flex-col items-center justify-center gap-4 text-slate-600 w-72 md:w-96 m-auto mt-10'>
    <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    <h1 className='text-center text-2xl md:text-4xl font-bold'>Login</h1>
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col items-start justify-center gap-2 w-full'
    >

      <h3 className='text-[16px] mt-5 font-medium text-teal-100 mb-2'>Email</h3>
      <AuthInput
        placeholder={'Email..'}
        onChange={setEmail}
        value={email}
        type={'email'}
        required={true}
      />
       <h3 className='text-[16px] mt-5 font-medium text-teal-100 mb-2'>Password</h3>
      <AuthInput
        placeholder={'Password..'}
        onChange={setPassword}
        value={password}
        type={'password'}
        required={true}
      />
      <CustomeBtn 
      btnText={'Login'}
      type={'submit'}
      disabled={isLoading}
      />
      </form>
      <p>Don't have an account? <NavLink to={'/'} className={'text-teal-400 font-medium underline'}>Signup</NavLink></p>
      <p>Forgot Passward? <NavLink to={'/forgot-pass'} className={'text-teal-400 font-medium underline'}>Reset Passward</NavLink></p>
    </div>
    </>
  )
}

export default Login;