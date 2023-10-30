import React from 'react'
import { motion } from 'framer-motion'

const GenreButtons = ({index, title, onClick, isGenereSelected}) => {
  
  return (
    <motion.div 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 0.5, delay: index * 0.2}}
    onClick={onClick}
    className={`px-4 py-1 border border-teal-900 rounded-xl text-gray-200 font-medium cursor-pointer active:scale-95 transition-all duration-300 
    ${isGenereSelected ? 'bg-green-700' : ''}`}
    >
        {title}
    </motion.div>
  )
}

export default GenreButtons