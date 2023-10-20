import React, { useState } from 'react'
import AuthInput from './AuthInput'
import CustomeBtn from '../Common/CustomeBtn'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../slices/userSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import PageHeader from '../Common/PageHeader'
import showErrorToast from '../../Util/showErrorToast'
import showToast from '../../Util/showToast'

const Login = () => {

//  imported dispatch and navigate
const dispatch = useDispatch()
const navigate = useNavigate()

// states
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)

// handle submit function
const handleSubmit = (e) => {
  // prevent default
  e.preventDefault()

  // validation
  if (!email || !password ) {
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

        // Saving the user details in the redux on successful signin
        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          profilePicUrl:userData.profilePic,
          favorites: userData.favorites,
          uid: userData.uid
        }))

          // signing up toast
          showToast('Welcome ❤ ...', 500)

        setIsLoading(false)

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
          btnText={'Login'}
          type={'submit'}
          disabled={isLoading}
          />
      </form>

      {/* Signup and forgot passward navigation links */}
      <p>Don't have an account? <NavLink to={'/'} className={'text-teal-400 font-medium underline'}>Signup</NavLink></p>
      <p>Forgot Passward? <NavLink to={'/forgot-pass'} className={'text-teal-400 font-medium underline'}>Reset Passward</NavLink></p>
      
    </div>
    </>
  )
}

export default Login;