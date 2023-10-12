import React, { useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Common/Navbar';
import { useDispatch } from 'react-redux'
import {setUser} from '../../slices/userSlice.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const Signup = () => {

  //  imported dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault()

    // validation
    if (!email || !password || !confirmPassword) {
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

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters', {
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
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

    
    // signing up with fire base
    const handleSignUp = async () => {
      setIsLoading(true)

      try {

        // Creating sers account
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )
          const user = userCredential.user;          
          
          // Saving user details
          await setDoc(doc(db, 'users', user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid
          })
          
          
          dispatch(setUser({
            name: fullName,
            email: user.email,
            uid: user.uid
          }))
          setIsLoading(false)

          // redirecting user to profile on successful signup
          navigate('/user/podcasts')
          
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          toast.error('User exists, try to Login... >>>', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate('/login')
          }, 3000);
        }
          else {     
            toast.error( error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        setIsLoading(false)
      }

    }

    // calling handleSignUp
    handleSignUp();

    // Clearing the input fields
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
    <Navbar />
    <div className='mt-10 flex flex-col items-center justify-center gap-4 text-slate-600 w-72 md:w-96 m-auto'>
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
      <h1 className='text-center text-2xl md:text-4xl font-bold'>Signup</h1>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col items-start justify-center gap-2 w-full'>

        <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Full Name</h3>
        <AuthInput
          placeholder={'Full Name..'}
          onChange={setFullName}
          value={fullName}
          type={'text'}
        />

        <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Email</h3>
        <AuthInput
          placeholder={'Email..'}
          onChange={setEmail}
          value={email}
          type={'email'}
        />

         <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Password</h3>
        <AuthInput
          placeholder={'Password..'}
          onChange={setPassword}
          value={password}
          type={'password'}
        />

         <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Confirm Password</h3>
        <AuthInput
          placeholder={'Confirm Password..'}
          onChange={setConfirmPassword}
          value={confirmPassword}
          type={'password'}
        />

        <CustomeBtn
        btnText={'Signup'}
        type={'submit'}
        disabled={isLoading}
        />
      </form>
      <p>Already have an account? <NavLink to={'/login'} className={'text-teal-400 font-medium underline'}>Login</NavLink></p>
    </div>
    </>
  )
}

export default Signup