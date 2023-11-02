import React, { useState }  from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../Common/PageHeader';
import AuthInput from '../../Auth/AuthInput';
import FileInput from '../../Common/FileInput';
import CustomeBtn from '../../Common/CustomeBtn';
import showErrorToast from '../../../Util/showErrorToast';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const EditPodcast = () => {

    // Getting the id
    const { id } = useParams();

    // Getting the navigation and dispatch refs
    const navigate = useNavigate();

    const [podcastTitle, setPodcastTitle] = useState('')
    const [podcastDesc, setPodcastDesc] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    console.log(id);

    const handleEditSubmit = async () => {

        setIsLoading(true)

        if (!podcastTitle && !podcastDesc) {
            showErrorToast('Please fill atleast one field', 1000)
        }

        // conditionally adding keys and values in the object to update in the db
        const updatedObj = {};

        if (podcastTitle) {
            updatedObj.title = podcastTitle;
        }
        
        if (podcastDesc) {
            updatedObj.desc = podcastDesc;
        }


        // Updating the podcast details in the db
        await updateDoc(doc(db, "podcasts", id), updatedObj);

        setIsLoading(false)
        setPodcastDesc('')
        setPodcastTitle('')
        navigate(-1)
    }

  return (
    <div className=' max-w-screen-lg min-h-screen m-auto'>
        <PageHeader title='Edit Podcast' />

        <div className='w-full h-full flex flex-col justify-start items-start md:gap-5 gap-2'>

            <div className='w-full'>
                <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>New Name</h3>
                <AuthInput
                placeholder={'New title..'}
                onChange={setPodcastTitle}
                value={podcastTitle}
                type={'text'}
                isPasswordInput={false}
                />
          </div>

          <div className='w-full'>
                <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>New Description <span className='text-[10px] text-gray-500'>(Optional)</span></h3>
                <AuthInput
                placeholder={'New desc...'}
                onChange={setPodcastDesc}
                value={podcastDesc}
                type={'text'}
                isPasswordInput={false}
                />
          </div>

          <div className='w-full'>
            <CustomeBtn 
            type='button' 
            action={handleEditSubmit} 
            btnText='Edit Podcast' 
            disabled={isLoading} />
          </div>

        </div>

    </div>
  )
}

export default EditPodcast