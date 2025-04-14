import React from 'react';

function EmptyCard({imgSrc,message}) {
  return (
    <div className='flex flex-col items-center justify-center mt-20 '>
        <img src={imgSrc} alt="No notes" className='w-40 sm:w-70' />
        <p className=' text-xs sm:text-lg font-medium text-white text-center leading-7 mt-5  w-[60%] '>{message}</p>
    </div>
  )
}

export default EmptyCard
