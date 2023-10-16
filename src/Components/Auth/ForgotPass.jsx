import React, { useState } from 'react'
import Navbar from '../Common/Navbar'
import CommonInput from '../Common/CommonInput'
import CustomeBtn from '../Common/CustomeBtn'
import { toast } from 'react-toastify'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom'

const ForgotPass = () => {


    const navigate = useNavigate()


    const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
        toast.error('Please enter an email');
        setIsLoading(false);
        return;
    }

    try {
        // Attempt to send a password reset email
        await sendPasswordResetEmail(auth, email);
        setEmail('');
        setIsLoading(false);
        toast.success('Password reset email sent...');
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            toast.error('No user found with this email address. Please check your email address or sign up for a new account.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
        setIsLoading(false);
    }

    navigate('/login')
};

  return (
    <>
    <Navbar/>
    <div className='w-screen min-h-screen'>
        <form 
        className='flex flex-col items-start justify-start max-w-screen-md m-auto h-full md:px-20 px-5'>
            <h1 className='text-start text-2xl md:text-4xl font-bold text-gray-500 mt-10 mb-10'>Forgot Password</h1>
            <CommonInput
            placeholder={'Enter eamil...'}
            type={'email'}
            value={email}
            onChange={setEmail} 
            />
            <CustomeBtn
            type={'submit'}
            btnText={'SEND'}
            action={handleResetSubmit}
            disabled={isLoading}
            />
            <p className='text-gray-500 text-center text-sm m-auto mt-5'>On Clicking you will recieve Passward reset link on <span className='font-bold'>{email}</span></p>
            <p className='text-gray-500 text-center text-sm m-auto mt-2'>Please ensure that you enter the email address you used during the signup process.</p>
            <p className='text-gray-500 text-center text-sm m-auto mt-5'>Don't have an account? <NavLink to='/' className='text-teal-400 font-medium underline'>Signup</NavLink></p>
        </form>
    </div>
    </>
  )
}

export default ForgotPass