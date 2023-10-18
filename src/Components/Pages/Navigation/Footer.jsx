import React from 'react'
import { FacebookIcon, FacebookShareButton,InstapaperIcon,InstapaperShareButton,WhatsappIcon, WhatsappShareButton } from "react-share";

const Footer = () => {


  const shareUrl = window.location.href;
  console.log(shareUrl);

  return (
    <div className=' max-w-screen-xl m-auto h-20border flex flex-col items-start justify-start md:px-10 px-5'>
    <h1 className='text-2xl text-gray-700 font-bold pb-5'>Share with others</h1>
    <div className='flex items-start justify-start flex-wrap m-auto gap-2 w-full pb-20 '>
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
    <InstapaperShareButton
      url={shareUrl}
      quote={'Listen FREE Podcasts only On POD-X'}
      hashtag={'#POD-X'}
    >
      <InstapaperIcon size={40} round={true} />
    </InstapaperShareButton>
    </div>
  </div>
  )
}

export default Footer;