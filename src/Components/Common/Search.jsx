import React, { useState } from 'react'
import { motion } from 'framer-motion';

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
    <motion.div 
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 0.5}}
    className='w-full mt-10 text-white'>
    <input 
        className='w-full bg-transparent py-2 px-10 outline-none border-2 border-gray-500 rounded-2xl'
        placeholder='search for collection'
        value={searchedTerm}
        onChange={handleSearch}
    />
  </motion.div>
  )
}

export default Search