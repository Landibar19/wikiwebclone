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
import React from 'react';
import { DidYouKnowData } from '@/app/api/DidYouKnowData';

const MainPage = () => {
  return (
    <div className='w-full font-serif'>
      <div className='flex flex-col items-center justify-center w-full h-30 bg-purple-50 border border-gray-300 p-4'>
        <p className='text-2xl text-center'>Welcome to Wikipedia,</p>
        <div className="flex flex-col items-center justify-center">
          <div className='flex flex-col sm:flex-row items-center justify-center'>
            <span>The</span>
            <Link href='/'>
              <h2 className='p-1 text-blue-600'>free encyclopedia</h2>
            </Link>
            <span>that</span>
            <Link href='/'>
              <h2 className='p-1 text-blue-600'>anyone can edit</h2>
            </Link>
          </div>
          <div className='flex flex-col sm:flex-row items-center justify-center'>
            <h1 className='p-1 text-blue-600'>6736354</h1>
            <span>articles in</span>
            <h1 className='p-1 text-blue-600'>English</h1>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-purple-50 border border-gray-300 p-4'>
        <div>
          <FeaturedArticles articles={FeaturedArticlesData} title="Featured Articles" />
          <DidYouKnow title="Did You Know?" articles={DidYouKnowData} />
        </div>
        <div>
          <News articles={NewsData} title="In the News" />
          <OnThisDay articles={OnThisDayData} title="On This Day" />
        </div>
      </div>
      <div className='mt-3 bg-purple-50 border border-gray-300 p-4'>
        <FeaturedPicture articles={FeaturedPictureData} title="Featured Picture" />
      </div>
    </div>
  );
};

export default MainPage;