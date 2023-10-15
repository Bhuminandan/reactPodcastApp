import React from 'react'

const GenresDisplay = ({genreText}) => {
  return (
    <div className='px-4 py-1 bg-green-800 border border-teal-900 rounded-full text-gray-200 font-medium cursor-default'>{genreText}</div>
  )
}

export default GenresDisplay