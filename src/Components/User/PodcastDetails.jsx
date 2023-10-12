import React,  { useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const PodcastDetails = () => {

    const [podcast, setPodcast] = useState('');

    const { id } = useParams();
    console.log(id);


     useEffect(() => {
        if (id) {
            getData()
        }
    }, [id]);

    const getData = async () => {
        try {
                const docRef = doc(db, "podcasts", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data()); 
                    setPodcast(docSnap.data());                   
                } else {
                    console.log('Document does not exist');
                    toast.error('Something went wrong')
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong')
            }
        };

  return (
    <div>
        {
            <div className='max-w-screen-xl m-auto px-5 md:px-10 text-gray-500 rounded-2xl overflow-hidden'>
                <h1 className='text-2xl md:text-4xl font-bold text-gray-300 md:mt-10 '>{podcast.title}</h1>
                <img 
                className='mt-10 w-full h-72 object-cover opacity-80 rounded-2xl bg-black shadow-md shadow-teal-900'
                src={podcast.displayImg} 
                alt="banner" />
                <h3 className='mt-10 text-xl font-bold'>Podcast info</h3>
                <div className='mt-10 text-gray-400 w-full'>{podcast.desc}</div>
            </div>
        }
    </div>
  )
}

export default PodcastDetails