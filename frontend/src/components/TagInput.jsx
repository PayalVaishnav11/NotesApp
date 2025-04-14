import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

function TagInput({tags,setTags}) {
   
    const [inputValue,setInputValue] = useState("");

    const addNewTag = ()=> {
         if(inputValue.trim() === "") return ;

         setTags((prevTags)=>[...prevTags,inputValue.trim()]);
         setInputValue("")
    }
   

    const handleKeyDown = (e)=> {
         if(e.key==="Enter"){
            addNewTag();
         }
       
    };
    const handleRemoveTag = (tagToRemove)=> {
        setTags(tags.filter((tag)=> tag !== tagToRemove))  
        // agar loop e andar ka tag equal nahi hai tag to remove ke yaani ,result true hai to vo as it is Array me hi rahega 
        // but agar tag eual hai tag to remove ke to yaani result false hai to vo filter out ho jayeg ayaani remove ho jayega
    }
  return (
    <div>
        {
            tags.length > 0 && (
               <div className='flex items-center gap-2 flex-wrap mt-2'>
                {
                  tags.map((eachTag)=> (
                     <span
                      key={Math.random()}
                      className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'
                      >
                        #{eachTag}
                        <button onClick={()=>handleRemoveTag(eachTag)}>
                           <MdClose/>
                        </button>
                      </span>
                  ))
                }
                </div>
                
            )
        }

         <div className=' flex items-center gap-4 mt-3'>
            <input 
            type="text"
            className='text-sm bg-transparent border px-3 py-2 rounded outline-none '
            placeholder='Add Tags'
            onChange={(e)=> setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button
             className='w-8 h-8  flex items-center justify-center rounded border border-fuchsia-800 hover:bg-fuchsia-800 duration-200'
             onClick={addNewTag}
            >
                <MdAdd className='text-2xl text-fuchsia-800 hover:text-white'/>
            </button>
         </div>
    </div>
  )
}

export default TagInput
