import React from 'react'
import { NavLink } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton,TelegramIcon,TelegramShareButton,TwitterIcon,TwitterShareButton,WhatsappIcon, WhatsappShareButton } from "react-share";
import weblogo from '../../../data/weblogo.png'
const Footer = () => {


  const shareUrl = window.location.href;

  return (
    <div className=' max-w-screen-xl m-auto h-20border flex flex-col items-start justify-start md:px-10 px-5 mt-20'>
    <div className='flex items-start justify-between flex-wrap m-auto gap-2 w-full pb-20 '>
      <div className='flex flex-col items-start justify-start gap-4'>
      <h3 className='text-2xl text-gray-700 font-bold pb-5'>POD-X</h3>
        <img 
        className='w-10'
        src={weblogo} alt="logo" />
      </div>
      <div className='flex flex-col items-start justify-start gap-4'>
        <h3 className='text-2xl text-gray-700 font-bold pb-5'>Important Links</h3>
        <NavLink className={'text-md hover:text-slate-200 duration-300 transition-all text-gray-600 font-semibold'} to='/user/privacy-policy'>Privacy Policy</NavLink>
      </div>
      <div className='flex flex-col items-start justify-start gap-4'>
          <h3 className='text-2xl text-gray-700 font-bold pb-5'>Share with others</h3>
          <div className='flex items-start justify-start gap-4 flex-wrap'>
            <FacebookShareButton
              url={shareUrl}
              quote={'Listen FREE Podcasts only On POD-X'}
              hashtag={'#POD-X'}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              quote={'Listen FREE Podcasts only On POD-X'}
              hashtag={'#POD-X'}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton
              url={shareUrl}
              quote={'Listen FREE Podcasts only On POD-X'}
              hashtag={'#POD-X'}
            >
              <TelegramIcon size={40} round={true} />
            </TelegramShareButton>
            <TwitterShareButton
              url={shareUrl}
              quote={'Listen FREE Podcasts only On POD-X'}
              hashtag={'#POD-X'}
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
          </div>
      </div>

    </div>
  </div>
  )
}

export default Footer;