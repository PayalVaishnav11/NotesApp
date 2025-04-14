import React from 'react';

function EmptyCard({imgSrc,message}) {
  return (
    <div className='flex flex-col items-center justify-center mt-20 '>
        <img src={imgSrc} alt="No notes" className='w-70' />
        <p className=' text-lg font-medium text-white text-center leading-7 mt-5  w-[80%] '>{message}</p>
    </div>
  )
}

export default EmptyCard
