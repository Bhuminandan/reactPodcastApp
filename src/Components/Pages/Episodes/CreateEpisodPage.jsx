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

const CreateEpisodPage = () => {

    const param = useParams()
    const navigate = useNavigate();
    const id = param.id;

    const [episodName, setEpisodName] = useState('')
    const [episodDesc, setEpisodDesc] = useState('')
    const [audioFile, setAudioFile] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [isBannerSelected, setIsBannerSelected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [favoriteGenres, setFavoriteGenres] = useState([])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true)

        if (!episodName || !episodDesc || !audioFile || !bannerImg) {
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
            setIsLoading(false)
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
            setIsLoading(false)
            return
        }

        toast.success('Podcast Episod Creating, Please Wait...', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })

        try{

            const audioRef = ref(storage, `podcasts-episods/${auth.currentUser.uid}/audio/${Date.now()}`)
            await uploadBytes(audioRef, audioFile);
            const audioUrl = await getDownloadURL(audioRef)

            const bannerImgRef = ref(storage, `podcasts-episods/${auth.currentUser.uid}/banners/${Date.now()}`)
            await uploadBytes(bannerImgRef, bannerImg);
            const bannerImgUrl = await getDownloadURL(bannerImgRef)

            toast.success('Audio Uploaded Succusfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            const episodesData =  {
                episodTitle: episodName,
                episodDesc: episodDesc,
                audioFile: audioUrl,
                favoriteGenres: favoriteGenres,
                bannerImg: bannerImgUrl,
            }

            const docRef = await addDoc(collection(db, "podcasts", id,  "episods"), episodesData);
            console.log(docRef);
            

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

            setIsLoading(false)

            setTimeout(() => {
                navigate(`/user/podcasts/${id}`)
            }, 1000)

        }catch(error) {
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
            setIsLoading(false)
        }

        setIsLoading(false)
        setIsFileSelected(false)
        setEpisodName('')
        setEpisodDesc('')
        setAudioFile('')
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
                <h3 className='text-[16px] font-medium text-green-200 mb-5 mt-4'>Choose Genres (Min - 3)</h3>
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