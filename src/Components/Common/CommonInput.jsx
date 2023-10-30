import React from 'react'
import {motion} from 'framer-motion'

const CommonInput = ({placeholder, onChange, value, type, isReadOnly}) => {

  return (

    <motion.input
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5}} 
        className='bg-transparent text-white px-6 py-2 w-full outline-none border border-teal-900 rounded-xl' 
        placeholder={placeholder} 
        onChange={(e) => onChange(e.target.value)} 
        value={value} 
        type={type}
        readOnly={isReadOnly}
    />
    
  )
}

export default CommonInput