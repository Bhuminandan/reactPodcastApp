import React from 'react'

const GenreButtons = ({title, onClick, isGenereSelected}) => {
  
  return (
    <div 
    onClick={onClick}
    className={`px-4 py-1 border border-teal-900 rounded-xl text-gray-200 font-medium cursor-pointer active:scale-95 transition-all duration-300 
    ${isGenereSelected ? 'bg-green-700' : ''}`}
    >
        {title}
    </div>
  )
}

export default GenreButtons