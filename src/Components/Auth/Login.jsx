import React, { useEffect, useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { GoogleAuthProvider, getAdditionalUserInfo, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import PageHeader from '../Common/PageHeader'
import showErrorToast from '../../Util/showErrorToast'
import showToast from '../../Util/showToast'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { FaGoogle } from 'react-icons/fa'
import showSuccessToast from '../../Util/showSuccessToast'

const Login = () => {

  //  imported dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const updateUserData = async (userData) => {
        // Saving the user details in the redux on successful signin
        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          profilePicUrl: userData.profilePic,
          favorites: userData.favorites,
          uid: userData.uid
        }))


  }


  // handle submit function
  const handleSubmit = (e) => {
    // prevent default
    e.preventDefault()

    // validation
    if (!email || !password) {
      showErrorToast('Please fill all the fields', 2000)
      return;

    }


    // signing in with fire base
    const handleSignIn = async () => {

      setIsLoading(true)

      try {

        // Signing in with inbuilt signin firebase hook
        const userCredential = await signInWithEmailAndPassword( // signInWithEmailAndPassword is Inbuilt method of firebase
          auth,
          email,
          password
        )
        const user = userCredential.user;

        // Saving user details
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data();

        // updating user data
        updateUserData(userData)

        setIsLoading(false)
        
        // signing up toast
        showToast('Welcome ❤ ...', 500)

        // redirecting user to podcasts page on successful signin
        navigate('/user/podcasts')

      } catch (error) {  // Handling the error gracefully
        console.log(error.message);
        showErrorToast('Invalid email or password', 2000)
        setIsLoading(false)
      }

    }

    // calling handleSignIn
    handleSignIn();

    // Clearing the input fields
    setEmail('')
    setPassword('')
  }



  // handle sign in with google
  const handleSignInWithGoogle = async () => {
    setIsLoading(true)
    try {

      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider)


    } catch (error) {
      console.log(error.message);
      showErrorToast('Something went wrong', 2000)
      setIsLoading(false)
    }

    setIsLoading(false)
  }



  useEffect(() => {
    const getUserInfoAfterSignin = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          const user = result.user;
          // Saving user details
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          const userData = userDoc.data();

          updateUserData(userData)
          navigate('/user/podcasts')
          setIsLoading(false)
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
      <div className='flex flex-col items-center justify-center gap-4 text-slate-600 w-72 md:w-96 m-auto mt-10'>

        {/* Page header */}
        <PageHeader title={'Log in'} mt={0} mb={5} />

        {/* Signin form */}
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
            btnText={'Sign In With Email'}
            type={'submit'}
            disabled={isLoading}
          />
        </form>

        {/* Signup with Google */}
        <div className='flex flex-col items-center justify-center gap-2 w-full -mt-8'>
          <CustomeBtn
            btnText={'Sinup With Google'}
            type={'submit'}
            action={handleSignInWithGoogle}
            disabled={isLoading}
          />
          <p className='text-sm flex items-center gap-2'>Secured <BsFillShieldLockFill /><FaGoogle /></p>
        </div>

        {/* Signup and forgot passward navigation links */}
        <p>Don't have an account? <NavLink to={'/signup'} className={'text-teal-400 font-medium underline'}>Signup</NavLink></p>
        <p>Forgot Passward? <NavLink to={'/forgot-pass'} className={'text-teal-400 font-medium underline'}>Reset Passward</NavLink></p>

      </div>
    </>
  )
}

export default Login;