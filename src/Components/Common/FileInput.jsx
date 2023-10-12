import React, { useState } from 'react'

const FileInput = ({accept, onChange, value , id, isFileSelected , setIsFileSelected}) => {

  const [selectedFileName, setSelectedFileName] = useState('')

    const handleFileSection = (e) => {
        setIsFileSelected(true)
        onChange(e.target.files[0]) 
        setSelectedFileName(e.target.files[0].name)
    }

  return (
    <>
    <label 
        htmlFor={id}
        className={`text-green-400 bg-transparent cursor-pointer px-6 py-2 w-full outline-none border border-teal-900 rounded-xl ${isFileSelected ? ` border-white border-2 text-amber-100 font-bold` : ''}`}
        >
            {isFileSelected ? 'File Selected: ' + selectedFileName.substring(0, 14) : value}
    </label>
      <input 
          text={value}
          id={id} 
          accept={accept} 
          onChange={handleFileSection} 
          className='hidden'
          type="file" 
      />
    </>
  )
}

export default FileInput