import React from 'react'
import CommonInput from '../Common/CommonInput'
import { useState } from 'react'
import createPodcast from '../../data/illustrations/podcastIconCreate.svg'
import FileInput from '../Common/FileInput'
import CustomeBtn from '../Common/CustomeBtn'
import { ToastContainer, toast } from 'react-toastify'
import {storage, auth, db} from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'

const CreatePodcast = () => {


    const navigate = useNavigate()

    const [podcastName, setPodcastName] = useState('')
    const [podcastDesc, setPodcastDesc] = useState('')
    const [displayImg, setDisplayImg] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    const [isBannerSelected, setIsBannerSelected] = useState(false)
    const [isDisplaySelected, setIsDisplaySelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleCreatePodcastSubmit = async (e) => {
        e.preventDefault()
        console.log(podcastName);
        console.log(podcastDesc);
        console.log(displayImg);
        console.log(bannerImg);


        if (!podcastName || !podcastDesc || !displayImg || !bannerImg) {

            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        toast.success('Podcast Creating...', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        setIsLoading(true)


        if(podcastName && podcastDesc && displayImg && bannerImg){

            try {

                  // uploading banner image to firebase storage
            const bannerImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            const uploadedBanner = await uploadBytes(bannerImgRef, bannerImg);
            console.log(uploadedBanner);
            toast.success('Banner Image Uploaded', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            const bannerImgUrl = await getDownloadURL(uploadedBanner.ref);


            // uploading banner image to firebase storage
            const displayImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            const uploadedDisplay = await uploadBytes(displayImgRef, displayImg);
            console.log(uploadedDisplay);
            toast.success('Display Image Uploaded', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            const displayImgUrl = await getDownloadURL(uploadedDisplay.ref);

            const podCastdata = {
                title: podcastName,
                desc: podcastDesc,
                displayImg: displayImgUrl,
                bannerImg: bannerImgUrl,
                createdBy: auth.currentUser.uid
            }

            // creating podcast doc
            await addDoc(collection(db, 'podcasts'), podCastdata)

            toast.success('Podcast Created', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
                
            } catch (error) {
                console.log(error.message);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })                
            }
          
        } else {
            toast.error('Something went wrong')
        };

        setIsLoading(false)
        setPodcastName('')
        setPodcastDesc('')
        setDisplayImg(null)
        setBannerImg(null)
        setIsBannerSelected(false)
        setIsDisplaySelected(false)
        navigate('/user/podcasts')
    }


  return (
    <div className='flex items-start justify-center w-screen min-h-screen max-w-screen-2xl text-green-100 m-auto'>
        <ToastContainer/>
        <div className="left h-full w-full md:w-1/2 px-10 py-20">
            <h1 className='text-4xl font-bold mb-10'>Create Podcast</h1>
            <form onSubmit={handleCreatePodcastSubmit}>
            <div className="input-div">
                <h3 className='text-[16px] font-medium text-green-200 mb-2'>Podcast Name</h3>
                <CommonInput
                    placeholder={'Podcast Name'}
                    type={'text'}
                    value={podcastName}
                    onChange={setPodcastName}
                />
            </div>
            <div className="input-div mt-4 mb-10">
                <h3 className='text-[16px] font-medium text-green-200 mb-2'>Podcast Description</h3>
                <CommonInput
                    placeholder={'Podcast Description'}
                    type={'text'}
                    value={podcastDesc}
                    onChange={setPodcastDesc}
                />
            </div>
            <div className="input-div mt-4">
                <h3 className='text-[16px] font-medium text-green-200 mb-4'>Display Image <span className='text-[10px] text-gray-500'>Preff. Size: 400 x 400 px</span></h3>
                <FileInput
                accept={'image/*'}
                onChange={setDisplayImg}
                value={'Upload Display Image'}
                id={'displayImg'}
                setIsFileSelected={setIsDisplaySelected}
                isFileSelected={isDisplaySelected}
                />
            </div>
            <div className="input-div mt-4 mb-10">
                <h3 className='text-[16px] font-medium text-green-200 mb-4'>Banner Image <span className='text-[10px] text-gray-500'>Preff. Size: 1200 x 600 px</span></h3>
                <FileInput
                accept={'image/*'}
                onChange={setBannerImg}
                value={'Upload Banner Image'}
                id={'bannerImg'}
                setIsFileSelected={setIsBannerSelected}
                isFileSelected={isBannerSelected}

                />
            </div>
            <CustomeBtn 
                type={'submit'}
                btnText={'Create Podcast'}
                disabled={isLoading}
            />
            </form>
        </div>
        <div className="md:flex items-center justify-center w-1/2 h-screen hidden -mt-10">
                <img src={createPodcast} className=' w-3/4' alt="podcast img" />
        </div>
    </div>
  )
}

export default CreatePodcast