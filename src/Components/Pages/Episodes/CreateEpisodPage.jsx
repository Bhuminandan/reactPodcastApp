import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommonInput from '../../Common/CommonInput'
import { useState } from 'react'
import FileInput from '../../Common/FileInput'
import CustomeBtn from '../../Common/CustomeBtn'
import { toast } from 'react-toastify'
import {storage, auth, db} from '../../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate} from 'react-router-dom'
import illustration from '../../../data/illustrations/createEpisodPageIllustration.svg'
import genres from '../../../data/staticData/genres'
import GenreButtons from '../../Common/GenreButtons'
import PageHeader from '../../Common/PageHeader'
import showErrorToast from '../../../Util/showErrorToast'
import showToast from '../../../Util/showToast'
import showSuccessToast from '../../../Util/showSuccessToast'

const CreateEpisodPage = () => {

    // Getting the id from url
    const param = useParams()

    // Geting the navigation ref
    const navigate = useNavigate();

    // Getting the id
    const id = param.id;

    // States for the episod form
    const [episodName, setEpisodName] = useState('')
    const [episodDesc, setEpisodDesc] = useState('')
    const [audioFile, setAudioFile] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [isBannerSelected, setIsBannerSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [favoriteGenres, setFavoriteGenres] = useState([])

    // handler for form submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true)

        // Validations
        if (!episodName || !episodDesc || !audioFile || !bannerImg) {
            showErrorToast('Please fill all the fields', 1000)
            setIsLoading(false)
            return;
        }

        if (favoriteGenres.length < 1) {
            showErrorToast('Please select at least one genre', 1000)
            setIsLoading(false)
            return
        }

        showToast('Podcast Episod Creating, Please Wait...', 10000)

        try{

            // uploading the audio
            const audioRef = ref(storage, `podcasts-episods/${auth.currentUser.uid}/audio/${Date.now()}`)
            await uploadBytes(audioRef, audioFile);
            const audioUrl = await getDownloadURL(audioRef)

            // uploading the banner
            const bannerImgRef = ref(storage, `podcasts-episods/${auth.currentUser.uid}/banners/${Date.now()}`)
            await uploadBytes(bannerImgRef, bannerImg);
            const bannerImgUrl = await getDownloadURL(bannerImgRef)


            showSuccessToast('Setting up few things...', 1000)

            // creating the episod object
            const episodesData =  {
                episodTitle: episodName,
                episodDesc: episodDesc,
                audioFile: audioUrl,
                favoriteGenres: favoriteGenres,
                bannerImg: bannerImgUrl,
            }

            // adding the episod in the db
            await addDoc(collection(db, "podcasts", id,  "episods"), episodesData);            

            showSuccessToast('Podcast Episod Created', 1000)

            setIsLoading(false)

            setTimeout(() => {
                navigate(`/user/podcasts/${id}`)
            }, 1000)

        }catch(error) {
            console.log(error.message);
            showErrorToast('Something went wrong', 1000)
            setIsLoading(false)
        }

        setIsLoading(false)
        setIsFileSelected(false)
        setEpisodName('')
        setEpisodDesc('')
        setAudioFile('')
    }

    // handler for genre click
    const handleGenereClick = (e) => {
        if (e) {     
            const genre = e.target.innerText;

            // checking if the genre is already added
            if(favoriteGenres.includes(genre)) {
                // removing the genre if it is
                setFavoriteGenres(favoriteGenres.filter(favGenre => favGenre !== genre))
            } else {
                // adding the genre
                setFavoriteGenres([...favoriteGenres, genre])
            }
        }
    }

    // Because async nature favoriteGenres was not working properly so we are using this UseEffect
    useEffect(() => {
        handleGenereClick(); 
    }, [favoriteGenres])

  return (
    <div className='w-screen min-h-screen'>
        <div className=' max-w-screen-xl h-full md:px-10 px-5 mt-10 w-full m-auto'>
            <PageHeader
            title={'Create Episode'}
            />
        <div className='flex items-center justify-between gap-10 w-full'>
            <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center gap-4 w-full md:w-1/2'
            >
                <div className='w-full'>
                    <h3 className='text-[16px] font-medium text-green-200 mb-2'>Episode Title</h3>
                    <CommonInput
                        placeholder={'Episod Title'}
                        type={'text'}
                        value={episodName}
                        onChange={setEpisodName}
                    />
                </div>
                <div className='w-full'>
                    <h3 className='text-[16px] font-medium text-green-200 mb-2'>Episode Description</h3>
                    <CommonInput
                        placeholder={'Episod Description'}
                        type={'text'}
                        value={episodDesc}
                        onChange={setEpisodDesc}   
                    />
                </div>
                <div className='w-full'>
                    <h3 className='text-[16px] font-medium text-green-200 mb-5'>Episode Audio</h3>
                    <FileInput 
                    accept={'audio/*'}
                    onChange={setAudioFile}
                    value={'Upload Podcast Audio'}
                    id={'audioFile'}
                    setIsFileSelected={setIsFileSelected}
                    isFileSelected={isFileSelected}
                    />
                </div>
                <div className='w-full'>
                    <h3 className='text-[16px] font-medium text-green-200 mb-5'>Episode Banner Image</h3>
                    <FileInput 
                    accept={'image/*'}
                    onChange={setBannerImg}
                    value={'Upload Banner Image'}   
                    id={'uploadBannerImg'}
                    setIsFileSelected={setIsBannerSelected}
                    isFileSelected={isBannerSelected}
                    />
                </div>

                <div className='w-full'>
                <h3 className='text-[16px] font-medium text-green-200 mb-5 mt-4'>Choose Genres (Min - 1)</h3>
                <div className='w-full flex items-start justify-start flex-wrap gap-2'>
                {
                    genres.map((genre) => {
                    console.log('Rendered map');
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
                </div>

                <CustomeBtn
                type={'submit'}
                btnText={'Create Podcast Episode'}
                action={() => {}}
                disabled={isLoading}
                /> 
            </form>
            <div className="md:w-1/2 w-0 hidden md:flex items-center justify-center">
                <img 
                className='w-full h-96'
                src={illustration} 
                alt="Episod Illustration" 
                />
            </div>
         </div>
        </div>
    </div>
  )
}

export default CreateEpisodPage