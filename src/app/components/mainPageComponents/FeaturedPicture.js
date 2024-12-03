import React from 'react'
import Image from 'next/image'

const FeaturedPicture = ({title, articles}) => {
  return (
    <div>
        <h2 className=' w-1/2 m-2 border border-solid border-gray-400 bg-blue-200 font-bold text-xl'>{title}</h2>
        {articles.map((article, index) => (
        <div 
        className='flex flex-rowS'
        key={index}
        >
          <Image 
          className='m-6'
          src={article.image} 
          alt={article.imageName} 
          width={300} 
          height={400} />
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  )
}

export default FeaturedPicture
