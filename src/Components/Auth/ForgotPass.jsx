import React, { useState } from 'react'
import CommonInput from '../Common/CommonInput'
import CustomeBtn from '../Common/CustomeBtn'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import showErrorToast from '../../Util/showErrorToast'
import showSuccessToast from '../../Util/showSuccessToast'


const ForgotPass = () => {

    // Getting navigate function ref
    const navigate = useNavigate()


    // states
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email) {
        showErrorToast('Please enter your email address', 3000);
        setIsLoading(false);
        return;
    }

    try {
        // Attempt to send a password reset email
        await sendPasswordResetEmail(auth, email); // sendPasswordResetEmail is Inbuilt method of firebase

        // Show success message
        setEmail('');
        setIsLoading(false);
        showSuccessToast('Password reset email sent', 3000);

    } catch (error) {
        // If error, show error message
        if (error.code === 'auth/user-not-found') {

            showErrorToast('No user found with this email address. Please check your email address or sign up for a new account.', 3000);

        } else {

            // Show error message
            console.error(error);
            showErrorToast('An error occurred. Please try again later.', 3000);
        }

        setIsLoading(false);
    }

    // Redirect to login page
    navigate('/login')
};

  return (
    <>
    <div className='w-screen min-h-screen'>

        {/* Form for password reset */}
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

            {/* Redirections and important information */}
            <p className='text-gray-500 text-center text-sm m-auto mt-5'>On Clicking you will recieve Passward reset link on <span className='font-bold'>{email}</span></p>
            <p className='text-gray-500 text-center text-sm m-auto mt-2'>Please ensure that you enter the email address you used during the signup process.</p>
            <p className='text-gray-500 text-center text-sm m-auto mt-5'>Don't have an account? <NavLink to='/signup' className='text-teal-400 font-medium underline'>Signup</NavLink></p>
        </form>
    </div>
    </>
  )
}

export default ForgotPass