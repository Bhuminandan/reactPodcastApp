import React from 'react'
import { motion } from 'framer-motion'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import showSuccessToast from '../../../Util/showSuccessToast'
import { useNavigate } from 'react-router-dom'

const Modal = ({setIsModalVisible, id}) => {

    const navigate = useNavigate();

    const handleDeletePodcast = async() => {
        await deleteDoc(doc(db, "podcasts", id))
        showSuccessToast('Podcast deleted successfully', 1000)
        setIsModalVisible(false)
        navigate(-1)
    }

  return (
    <div className='w-screen h-screen bg-opacity-60 bg-black absolute flex items-center justify-center z-50 text-slate-300'>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-96 h-72 bg-zinc-950 rounded-2xl p-10 flex flex-col items-start justify-between'>
            <div>
                <div className='text-2xl font-semibold'>Are you sure you want to delete this podcast?</div>
                <div className='text-sm text-red-200'>This action cannot be undone</div>
            </div>
            <div className='self-end flex items-center justify-center gap-2'>
                <button className='text-sm text-red-300 bg-black border border-slate-800 py-2 px-4 rounded-xl'
                onClick={handleDeletePodcast}
                >Yes</button>
                <button className='text-sm text-slate-300 bg-black border border-slate-800 py-2 px-4 rounded-xl'
                onClick={() => setIsModalVisible(false)}
                >No</button>
            </div>
        </motion.div>
    </div>
  )
}

export default Modal