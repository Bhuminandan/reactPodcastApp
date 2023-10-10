import React from 'react'

const AuthInput = ({placeholder, onChange, value, type}) => {
  return (
    <input className='bg-transparent text-white px-6 py-2 w-full outline-none border border-teal-900 rounded-xl' 
    placeholder={placeholder} 
    onChange={(e) => onChange(e.target.value)} 
    value={value} 
    type={type}
    />
  )
}

export default AuthInput