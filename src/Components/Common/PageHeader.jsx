import React from 'react'

const PageHeader = ({title, mt = 10, mb = 10}) => {
  return (
    // page header
    <h1 className={`md:text-4xl text-2xl text-gray-600 font-bold mt-${mt} mb-${mb}`}>{title}</h1>
  )
}

export default PageHeader