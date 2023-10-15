import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import CommonInput from '../Common/CommonInput';
import FileInput from '../Common/FileInput';
import CustomeBtn from '../Common/CustomeBtn';
import { ToastContainer, toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfilePage = () => {

    const navigate = useNavigate();

    const [newName, setNewName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const userId = useParams()
    console.log(userId);
    const user = useSelector(state => state.userSlice.user)
    console.log(user);

    const handleCancle = async () => {
        navigate(-1)
    }

    const handleUpdateProfile = async () => {

        setIsLoading(true)

        if (!newName) {
            toast.error('Please fill new name', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setIsLoading(false)
            return
        }

        try {
            
            if (isFileSelected) {
                const newProfileImgRef = ref(storage, `users/${user?.uid}/profilePic`)
                const uploadedProfile = await uploadBytes(newProfileImgRef, profilePic);
                const profilePicUrl = await getDownloadURL(uploadedProfile.ref);
                toast.success('uploading new profile...', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })

                await updateDoc(doc(db, "users", user?.uid), {
                    name: newName,
                    profilePic: profilePicUrl
                })
            } else {
                await updateDoc(doc(db, "users", user?.uid), {
                    name: newName
                })
            }

            toast.success('Profile updating...', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            setIsLoading(false)
            navigate(-1)
           
        } catch (error) {
            console.log(error.message);
            toast.error('Something went wrong')
            setIsLoading(false)
        }
            
        }
  return (
    <div className='flex flex-col items-start justify-start gap-4 max-w-screen-lg min-h-screen px-5 md:px-10 m-auto'>
        <ToastContainer/>
      <h1 className='text-4xl font-bold text-gray-600 mt-10'>Edit Profile</h1>

      <div className='flex flex-col items-start justify-start gap-4 w-full'>
        <h3 className='text-md font-bold text-gray-300'>New name</h3>
        <CommonInput
        placeholder={`Current name: @${user?.name}`}
        onChange={setNewName}
        value={newName}
        type={'text'}
        />
      </div>
      <div className='flex flex-col items-start justify-start gap-4 w-full'>
        <h3 className='text-md font-bold text-gray-300'>Profile new pic (Optional)</h3>
        <FileInput
        accept={'image/*'}
        onChange={setProfilePic}
        value={'Upload Profile Pic'}
        id={'profilePic'}
        setIsFileSelected={setIsFileSelected}
        isFileSelected={isFileSelected}
        />
        <div className='flex items-center justify-center gap-2 flex-wrap-reverse md:flex-nowrap w-full'>
            <CustomeBtn
            type={'submit'}
            action={handleCancle}
            btnText={'Cancle'}
            disabled={isLoading}
            />
             <CustomeBtn
            type={'submit'}
            action={handleUpdateProfile}
            btnText={'Update Profile'}
            disabled={isLoading}
            />
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage