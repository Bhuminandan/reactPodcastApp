import React, { useState, useEffect } from 'react'
import CommonInput from '../../Common/CommonInput'
import createPodcast from '../../../data/illustrations/podcastIconCreate.svg'
import FileInput from '../../Common/FileInput'
import CustomeBtn from '../../Common/CustomeBtn'
import { toast } from 'react-toastify'
import {storage, auth, db} from '../../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'
import genres from '../../../data/staticData/genres'
import GenreButtons from '../../Common/GenreButtons'
import { useSelector } from 'react-redux'
import PageHeader from '../../Common/PageHeader'

const CreatePodcast = () => {

    const user = useSelector((state) => state.userSlice.user)

    const navigate = useNavigate()

    const [podcastName, setPodcastName] = useState('')
    const [podcastDesc, setPodcastDesc] = useState('')
    const [displayImg, setDisplayImg] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    const [isBannerSelected, setIsBannerSelected] = useState(false)
    const [isDisplaySelected, setIsDisplaySelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [favoriteGenres, setFavoriteGenres] = useState([])

    const handleCreatePodcastSubmit = async (e) => {
        e.preventDefault()


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
            return;
        }

        if (favoriteGenres.length < 3) {
            toast.error('Please select at least 3 genres', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }

        toast.success('Podcast Creating...', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        setIsLoading(true)


        if(podcastName && podcastDesc && displayImg && bannerImg && favoriteGenres.length !== 0) {

            try {

                  // uploading banner image to firebase storage
            const bannerImgRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
            const uploadedBanner = await uploadBytes(bannerImgRef, bannerImg);


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
                genres: favoriteGenres,
                createdBy: auth.currentUser.uid,
                creatorName: user.name,
                createdOn: Date.now(),
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
    
    const handleGenereClick = (e) => {
        if (e) {     
            const genre = e.target.innerText;
            if(favoriteGenres.includes(genre)) {
                setFavoriteGenres(favoriteGenres.filter(favGenre => favGenre !== genre))
            } else {
                setFavoriteGenres([...favoriteGenres, genre])
            }
        }
    }

    useEffect(() => {
        handleGenereClick(); 
    }, [favoriteGenres])


  return (
    <div className='flex items-start justify-center w-screen min-h-screen max-w-screen-2xl text-green-100 m-auto'>
        <div className="left h-full w-full md:w-1/2 px-10 py-10">
            <PageHeader
            title={'Create Podcast Collection'}
            mt={'0'}
            mb={'10'}
            />  
            <form onSubmit={handleCreatePodcastSubmit}>
            <div className="input-div">
                <h3 className='text-[16px] font-medium text-green-200 mb-2'>Podcast Name</h3>
                <CommonInput
                    placeholder={'Podcast Title'}
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
            
        <h3 className='text-[16px] mt-2 md:mt-5 font-medium text-teal-100 mb-2'>Choose Genres (Min - 3)</h3>
        <div className='w-full flex items-start justify-start flex-wrap gap-2'>
          {
            genres.map((genre) => {
              return (
                <GenreButtons
                key={genre.id}
                title={genre.title}
                onClick={handleGenereClick}
                isGenereSelected={favoriteGenres.includes(genre.title)}
                />
              )
            })
          }
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