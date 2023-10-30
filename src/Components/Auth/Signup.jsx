import React, { useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink} from 'react-router-dom'
import showToast from '../../Util/showToast'
import showSuccessToast from '../../Util/showSuccessToast'
import showErrorToast from '../../Util/showErrorToast'
import { useDispatch } from 'react-redux'
import {setUser} from '../../slices/userSlice.js'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { auth, storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import FileInput from '../Common/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import PageHeader from '../Common/PageHeader';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { FaGoogle } from 'react-icons/fa';
import { useEffect } from 'react'


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
  const [isPrivacyAgreeChecked, setIsPrivacyAgreeChecked] = useState(false)


  const createDoc = async (user, profilePicUrl) => {

    setIsLoading(true)
    
    // Checking if the userDoc already exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      setIsLoading(false)
      return
    }
          // Saving user details
          await setDoc(doc(db, 'users', user.uid), {
            name: fullName,
            email: user.email,
            profilePic: profilePicUrl,
            uid: user.uid,
            favorites: []
          })
          
          // setting user details in redux
          dispatch(setUser({
            name: fullName,
            email: user.email,
            profilePicUrl: profilePicUrl,
            uid: user.uid,
            favorites: []
          }))
          
          setIsLoading(false)
          showSuccessToast('Signned up successfully', 3000)
  }
 
  
  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault()

    // validation
    if (!email || !password || !confirmPassword) {
      showErrorToast('Please fill all the fields', 3000)
      return;
      
    }

    if (password.length < 8) {
      showErrorToast('Password must be at least 8 characters', 3000)
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast('Passwords do not match', 3000)
      return;
    }

    if (!isProfilePicSelected) {
      showErrorToast('Please select a profile pic', 3000)
      return;
    }

    if (!isPrivacyAgreeChecked) {
      showErrorToast('Please agree to the terms and conditions', 3000)
      return;
    }

    // signing up toast
    showToast('🦄Creating Account ...', 8000)

    
    // signing up with fire base
    const handleSignUp = async () => {
      setIsLoading(true)
      try {

        // Creating users account
          const userCredential = await createUserWithEmailAndPassword( // createUserWithEmailAndPassword is Inbuilt method
            auth,
            email,
            password
          )

          // getting user details once signed up
          const user = userCredential.user;

          // uploading profile pic
          const profileImageRef = ref(storage, `users/${user.uid}/profilePic`);
          const uploadedProfile = await uploadBytes(profileImageRef, profilePic);
          const profilePicUrl = await getDownloadURL(uploadedProfile.ref);
       
          // saving user details
          createDoc(user, profilePicUrl)

          setIsLoading(false)
          showSuccessToast('Account created successfully', 3000)

          // redirecting user to profile on successful signup
          navigate('/user/podcasts')
          
      } catch (error) {

            // error handling 
            console.log(error);

            if (error.code === 'auth/email-already-in-use') {
              showErrorToast('User exists, try to Login... >>>', 3000)
              setTimeout(() => {
                navigate('/login')
              }, 3000);
            }


      else { // error handling if something goes wrong     

          showErrorToast('Something went wrong', 3000)
          setIsLoading(false)

      }

    }

    // Clearing the input fields
    setFullName('')
    setProfilePic('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setProfilePic('')
  }

  // calling handleSignUp
  handleSignUp();
}

  const handleSignUpWithGoogle = async() => {

    setIsLoading(true)

    try {

    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);

    setIsLoading(false)

    } catch (error) {
      
      if (error.code === 'auth/email-already-in-use') {
        showErrorToast('User exists, try to Login... >>>', 3000)
        setTimeout(() => {
          navigate('/login')
        }, 3000);
        setIsLoading(false)
      }

    }


  }

  useEffect(() => {
    const getUserInfoAfterSignin = async () => {
      try {

          const result = await getRedirectResult(auth)
          if (result) {
            const user = result.user;
            createDoc(user, user.photoURL)
            setIsLoading(false)

            showToast('Sining you in, Please wait...', 8000)

            navigate('/user/podcasts')
          } 
          
      } catch (error) {
            console.log(error) 
            showErrorToast('Something went wrong', 2000)
            setIsLoading(false)
      }
    }
    setIsLoading(false)
    getUserInfoAfterSignin()
  }, [])

  return (
    <>
    <div className='mt-10 pb-20 flex flex-col items-center justify-center gap-4 text-slate-600 w-72 md:w-1/2 m-auto h-auto'>

      {/* Page header */}
      <PageHeader title={'Sign Up'} mt={0} mb={5} />

      {/* Signup form */}
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

       <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Profile Pic</h3>
          <FileInput
          accept={'iamage/*'}
          onChange={setProfilePic}
          value={'Upload Profile Pic'}
          id={'profilePic'}
          isFileSelected={isProfilePicSelected}
          setIsFileSelected={setIsProfilePicSelected}
        />

        <CustomeBtn
        btnText={'Signup With Email'}
        type={'submit'}
        disabled={isLoading}
        />

      </form>

      {/* Signup with Google */}
      <div className='flex flex-col items-center justify-center gap-2 w-full -mt-6'>
        <CustomeBtn
          btnText={'Sinup With Google'}
          type={'submit'}
          action={handleSignUpWithGoogle}
          disabled={isLoading}
          />
          <p className='text-sm flex items-center gap-2'>Secured <BsFillShieldLockFill/><FaGoogle/></p>
      </div>

      {/* Privacy Policy */}
      <div className='flex items-center justify-center gap-4'>
        <input type="checkbox" id='privacy-checkbox' onChange={() => setIsPrivacyAgreeChecked(prev => !prev)}
        checked={isPrivacyAgreeChecked}
        />
        <label htmlFor="privacy-checkbox">Agree to the privacy policy <NavLink to={'/privacy-policy'} className={'text-teal-400 font-medium underline'}>Privacy Policy</NavLink></label>
      </div>

      {/* Login and forgot passward links */}
      <p>Already have an account? <NavLink to={'/login'} className={'text-teal-400 font-medium underline'}>Login</NavLink></p>
      <p>Forgot Passward? <NavLink to={'/forgot-pass'} className={'text-teal-400 font-medium underline'}>Reset Passward</NavLink></p>

    </div>
    </>
  )}
export default Signup;