import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TbExternalLink } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setGenre } from '../../slices/genreSlice'

const GenresDisplay = ({ genreText }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleGenreClick = () => {
    dispatch(setGenre(genreText))
    navigate(`/user/genres/${genreText}`)
  }

  return (
    <div
      onClick={handleGenreClick}
      className='px-4 py-1 bg-green-800 border border-teal-900 rounded-full text-gray-200 font-medium cursor-default flex items-center'>
      {genreText}
      <TbExternalLink className='ml-2' />
    </div>
  )
}

export default GenresDisplay