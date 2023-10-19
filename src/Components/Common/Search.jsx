import React, { useState } from 'react'

const Search = ({searchFrom, onChange}) => {

  // States
    const [searchedTerm, setSearchedTerm] = useState('')

    // Implementing search functionality with debouncing 
    let setTimeOutID;
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchedTerm(searchTerm);
      
        if (setTimeOutID) {
          clearTimeout(setTimeOutID);
        }
      
        setTimeOutID = setTimeout(() => {
          let updatedPodcastsList = searchFrom.filter((podcast) =>
            podcast.title.toLowerCase().includes(searchTerm)
          );
          onChange(updatedPodcastsList);
        }, 300);
    };

  return (
    <div className='w-full mt-10 text-white'>
    <input 
        className='w-full bg-transparent py-2 px-10 outline-none border-2 border-gray-500 rounded-2xl'
        placeholder='search for collection'
        value={searchedTerm}
        onChange={handleSearch}
    />
  </div>
  )
}

export default Search