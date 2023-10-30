import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { motion } from 'framer-motion'

const AuthInput = ({placeholder, onChange, value, type, isPasswordInput, isPassWordVisible, setIsPasswordVisible}) => {

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{duration: 0.5}}

    className='flex items-center justify-between px-2 py-2 w-full border border-teal-900 rounded-xl'>
      <input 
          className='bg-transparent text-white w-full h-full  outline-none rounded-2xl px-4 py-1'
          placeholder={placeholder} 
          onChange={(e) => onChange(e.target.value)} 
          value={value} 

          // Changing the type of input field based for show and hide password option
          type={
            isPasswordInput ? (
              isPassWordVisible ? 'text' : 'password'
            ) : type
          }
      />
      {

      // Only showing Showing and hiding password icon for password inputs only
      isPasswordInput && <>
      {
          isPassWordVisible ?
           <AiFillEyeInvisible onClick={() => setIsPasswordVisible(!isPassWordVisible)} className='text-2xl mr-2 rounded-full shadow-sm cursor-pointer active:transform active:translate-y-1'/>
           :
           <AiFillEye onClick={() => setIsPasswordVisible(!isPassWordVisible)} className='text-2xl mr-2 rounded-full shadow-sm cursor-pointer active:transform active:translate-y-1'/>
      }
      </>
      }
    </motion.div>
  )
}

export default AuthInput