import React from 'react'
import { motion } from 'framer-motion'

const PageHeader = ({title, mt = 10, mb = 10}) => {
  return (
    // page header
    <motion.h1
    initial={{ translateX: -50}}
    animate={{ translateX: 0}}
    transition={{ duration: 0.5}}
    className={`md:text-4xl text-2xl text-gray-600 font-bold mt-${mt} mb-${mb}`}>{title}</motion.h1>
  )
}

export default PageHeader