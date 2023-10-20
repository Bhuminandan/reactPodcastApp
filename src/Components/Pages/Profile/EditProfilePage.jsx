import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CommonInput from '../../Common/CommonInput';
import FileInput from '../../Common/FileInput';
import CustomeBtn from '../../Common/CustomeBtn';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { setUser } from '../../../slices/userSlice';
import showErrorToast from '../../../Util/showErrorToast';
import showSuccessToast from '../../../Util/showSuccessToast';

const EditProfilePage = () => {

    // Getting the navigation and dispatch refs
    const navigate = useNavigate();
    const dispath = useDispatch();

    // States for the profile edit 
    const [newName, setNewName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Getting the user details
    const user = useSelector(state => state.userSlice.user)

    // Handler for cancel button
    const handleCancle = async () => {
        navigate(-1)
    }

    // Handler for submit button
    const handleUpdateProfile = async () => {

        setIsLoading(true)

        // Validations
        if (!newName) {
            showErrorToast('Please enter new name before submitting', 2000)
            setIsLoading(false)
            return
        }

        try {
            // Checking if the new profile pic is selected or nor before its optional

            // if the new profile pic is selected then upload it
            if (isFileSelected) {

                // Uploading the new profile pic and getting url refrence
                const newProfileImgRef = ref(storage, `users/${user?.uid}/profilePic`)
                const uploadedProfile = await uploadBytes(newProfileImgRef, profilePic);
                const profilePicUrl = await getDownloadURL(uploadedProfile.ref);


                showSuccessToast('Profile Pic Updated', 1000)

                // Updating the user details in the db
                await updateDoc(doc(db, "users", user?.uid), {
                    name: newName,
                    profilePicUrl: profilePicUrl
                })

                // Updating the redux state
                dispath(setUser({
                    ...user,
                    name: newName,
                    profilePicUrl
                }))

            } else {


                // If not selected then just update the name

                // Updating the user details in the db
                await updateDoc(doc(db, "users", user?.uid), {
                    name: newName
                })

                // Updating the redux state
                dispath(setUser({
                    ...user,
                    name: newName,
                }))
            }

            showSuccessToast('Profile Updated Successfully', 1000)

            setIsLoading(false)
            navigate(-1)
           
        } catch (error) {
            console.log(error.message);
            showErrorToast('Something went wrong', 1000)
            setIsLoading(false)
        }
            
    }
  return (
    <div className='flex flex-col items-start justify-start gap-4 max-w-screen-lg min-h-screen px-5 md:px-10 m-auto'>
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