import React, { useState } from 'react';
import TagInput from './TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance.js';

function AddEditNotes({noteData , type ,onClose,getAllNotes,showToastMessage}) {
  const [tags,setTags] = useState(noteData?.tags || [])
  const [title,setTitle] = useState(noteData?.title || "");
  const [content,setContent] = useState(noteData?.content || "");
  const [error,setError] = useState(null);

  const addNewNote = async ()=> {
    try {
       const response = await axiosInstance.post("/add-note",{
          title,
          content,
          tags
       })
       console.log("add note response",response);
       if(response.data){
        showToastMessage("Note Added Successfully")
        getAllNotes();
        onClose();
            
       }

    } catch (error) {
       setError(error)
      console.log(error)
       }
  }


  const editNote = async ()=> {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/"+ noteId,{
         title,
         content,
         tags
      })
      console.log("add note response",response);
      if(response.data){
       showToastMessage("Note Updated Successfully")
       getAllNotes();
       onClose();
           
      }

   } catch (error) {
      setError(error)
     console.log(error)
      }

  }

  const handleAddNote = ()=> {
       if(!title){
        setError("Please enter th etitle");
        return ;
       }
       if(!content){
        setError("Please enter the content");
        return 
       }
       setError("")

       if(type === "edit"){
           editNote();
       }else{
        addNewNote();
       }
  }

  return (
    <div className='relative '>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100 '
        onClick={onClose}>
          <MdClose className='text-xl text-slate-400'/>
        </button>

       <div className='flex flex-col gap-2 '>
          <label  className='text-xs text-slate-400'>TITLE</label>
          <input 
          type="text"
          className='text-2xl text-slate-950 outline-none'
          placeholder='Add Title...'
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
           />
       </div>

       <div className='flex flex-col gap-2 mt-4'>
          <label className='text-xs text-slate-400'>CONTENT</label>
          <textarea 
          type="text"
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={(e)=> setContent(e.target.value)}
          />
        </div>

        <div className='mt-3'>
           <label className='text-xs text-slate-400'>Tags</label>
           <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        <button className='w-full text-sm bg-fuchsia-700 text-white  rounded my-1 hover:bg-fuchsia-600 border font-medium mt-5 p-3  duration-200'
        onClick={handleAddNote}>
            {type=== 'edit' ? "UPDATE" : "ADD"}
        </button>
    </div>
  )
}

export default AddEditNotes
