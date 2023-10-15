import React, { useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Common/Navbar';
import { useDispatch } from 'react-redux'
import {setUser} from '../../slices/userSlice.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import FileInput from '../Common/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Signup = () => {

  //  imported dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [isProfilePicSelected, setIsProfilePicSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPassWordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPassWordVisible, setIsConfirmPasswordVisible] = useState(false)
 
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
    toast('🦄Creating Account ...', {
      position: "top-right",
      autoClose: 8000,
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

          // Checking user has Provided profile pic or not
          // if not then generating randome image with API

          if (!isProfilePicSelected) {
            
          }

          // uploading profile pic
          const profileImageRef = ref(storage, `users/${user.uid}/profilePic`);
          const uploadedProfile = await uploadBytes(profileImageRef, profilePic);
          const profilePicUrl = await getDownloadURL(uploadedProfile.ref);
          
          // Saving user details
          await setDoc(doc(db, 'users', user.uid), {
            name: fullName,
            email: user.email,
            profilePic: profilePicUrl,
            uid: user.uid
          })
          
          
          dispatch(setUser({
            name: fullName,
            email: user.email,
            profilePicUrl: profilePicUrl,
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
    setProfilePic('')
  }

  return (
    <>
    <Navbar />
    <div className='mt-10 flex flex-col items-center justify-center gap-4 text-slate-600 w-72 md:w-1/2 m-auto h-auto'>
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

        <div className='flex items-center justify-between gap-2 flex-wrap w-full md:flex-nowrap'>
          <div className='w-full'>
            <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Full Name</h3>
            <AuthInput
              placeholder={'Full Name..'}
              onChange={setFullName}
              value={fullName}
              type={'text'}
              isPasswordInput={false}
            />
          </div>
          <div className='w-full'>
            <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Email</h3>
            <AuthInput
              placeholder={'Email..'}
              onChange={setEmail}
              value={email}
              type={'email'}
              isPasswordInput={false}
            />
          </div>
        </div>

        <div className='flex items-center justify-between gap-2 flex-wrap w-full lg:flex-nowrap'>
          <div className='w-full'>
              <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Password</h3>
              <AuthInput
                placeholder={'Password..'}
                onChange={setPassword}
                value={password}
                type={'password'}
                isPasswordInput={true}
                isPassWordVisible={isPassWordVisible}
                setIsPasswordVisible={setIsPasswordVisible}
              />
          </div>
          <div className='w-full'>
            <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Confirm Password</h3>
            <AuthInput
              placeholder={'Confirm Password..'}
              onChange={setConfirmPassword}
              value={confirmPassword}
              type={'password'}
              isPasswordInput={true}
              isPassWordVisible={isConfirmPassWordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
            />
          </div>
        </div>

       <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Profile Pic (Optional)</h3>
        <FileInput
        accept={'iamage/*'}
        onChange={setProfilePic}
        value={'Upload Profile Pic'}
        id={'profilePic'}
        isFileSelected={isProfilePicSelected}
        setIsFileSelected={setIsProfilePicSelected}
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