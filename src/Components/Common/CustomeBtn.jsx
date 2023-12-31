import React from 'react'
import Loader from './Loader'
import { motion } from 'framer-motion'

const CustomeBtn = ({type, action, btnText, disabled}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}

      className={`text-teal-100 active:scale-95 bg-gradient-to-br
      from-green-600 to-blue-800 hover:bg-gradient-to-bl ease-in-out duration-300 
      transition-all dark:focus:ring-green-800 font-medium rounded-xl text-[14px] 
      md:text-[18px] px-5 py-2.5 text-center mr-2 mb-2 w-full mt-5 
      ${disabled ?  `opacity-60` : ``}`}

      type={type}
      onClick={action}
      disabled={disabled}
      >
          {/* Showing loader inside button when disabled */}
          { disabled ? <Loader/> : btnText}

    </motion.button>
  )
}

export default CustomeBtn