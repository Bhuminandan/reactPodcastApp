import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TbExternalLink } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setGenre } from '../../slices/genreSlice'
import { motion } from 'framer-motion'

const GenresDisplay = ({ genreText, index }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleGenreClick = () => {
    dispatch(setGenre(genreText))
    navigate(`/user/genres/${genreText}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onClick={handleGenreClick}
      className='px-4 py-1 bg-green-800 border border-teal-900 rounded-full text-gray-200 font-medium cursor-default flex items-center'>
      {genreText}
      <TbExternalLink className='ml-2' />
    </motion.div>
  )
}

export default GenresDisplay