import { DidYouKnowData } from '@/app/api/DidYouKnowData';
import { FeaturedArticlesData } from '@/app/api/FeaturedArticleData';
import { NewsData } from '@/app/api/NewsData';
import { OnThisDayData } from '@/app/api/OnThisDayData';
import { FeaturedPictureData } from '@/app/api/FeaturedPictureData';
import DidYouKnow from '@/app/components/mainPageComponents/DidYouKnow';
import FeaturedArticles from '@/app/components/mainPageComponents/FeaturedArticle';
import FeaturedPicture from '@/app/components/mainPageComponents/FeaturedPicture';
import News from '@/app/components/mainPageComponents/News';
import OnThisDay from '@/app/components/mainPageComponents/OnThisDay';
import Link from 'next/link';
import React from 'react'

const MainPage = () => {
  return (
    <div className='w-full font-serif '>
        <div className='flex flex-col items-center justify-center w-full h-30 bg-purple-50 border border-gray-300 '>
          <p className='text-2xl'>Welcome to Wikipedia ,</p>
          <div className="flex flex-col items-center justify-center ">
            <div className='flex flex-row items-center justify-center'>
                The
                <Link href='/'>
                <h2 className='p-1 text-blue-600'>
                free encyclopedia
                </h2>
                </Link>
                that
                <Link href='/'>
                <h2 className='p-1 text-blue-600'>
                anyone can edit
                </h2> 
                </Link>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <h1 className='p-1 text-blue-600'>6736354</h1>
                articles in 
                <h1 className='p-1 text-blue-600'>English</h1>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 mt-3 bg-purple-50 border border-gray-300 '>
          <div>
            <FeaturedArticles articles={FeaturedArticlesData} title="Featured Articles" />
            <DidYouKnow title="Did You Know?" articles={DidYouKnowData} />
          </div>
          <div>
            <News articles={NewsData} title="In the News" />
            <OnThisDay articles={OnThisDayData} title="On This Day" />
            </div>
        </div>
        <div>
          <FeaturedPicture articles={FeaturedPictureData} title="Featured Picture" />
        </div>
    </div>
  )
}

export default MainPage;
