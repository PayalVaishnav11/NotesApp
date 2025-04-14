import React from 'react';

import { MdClose } from 'react-icons/md';

function ContentModal({onClose,data}) {
 return (

    <div className='relative flex items-center justify-center pt-10 bg-yellow-300 rounded-2xl overflow-y-auto   '>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-gray-100 '
                 onClick={onClose}>
                 <MdClose className='text-xl text-slate-400'/>
        </button>
       <div className=' text-center flex flex-wrap  break-words p-4  w-full overflow-y-auto'>
          {data}
       </div>
    </div>
  )
}

export default ContentModal
