import React from 'react';
import {MdOutlinePushPin ,MdCreate,MdDelete} from 'react-icons/md';
import moment from "moment";
import Modal from 'react-modal';
import { useState } from 'react';
import ContentModal from './ContentModal';
import {FaRegEye } from 'react-icons/fa6'

function NoteCard({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) {

  const [openContentModal,setOpenContentModal] = useState({
      isShown:false,
      data:null
    })
    const handleContentModal = (contentData)=> {
      setOpenContentModal({
        isShown:true,
        data:contentData
      })
    }

  return (
    <div className='  w-full max-w-xs sm:max-w-sm mx-auto border rounded-md  hover:shadow-xl  transition-all ease-in-out flex flex-col  bg-fuchsia-200  '>
        
        <h6 className='text-base sm:text-lg font-semibold text-wrap bg-fuchsia-700  px-4 pt-2 pb-2 rounded-t-md text-slate-100 '>{title}</h6>

        <div className='flex items-center justify-between  text-sm flex-wrap pl-4 pr-4 pt-3'>
             <div>
               
                <span className='text-sm text-slate-900'>{moment(date).format('Do MMM YYYY')}</span>
             </div>
             <MdOutlinePushPin 
             size={22}
             onClick={onPinNote}
             className={`text-xl  cursor-pointer hover:text-[#2B85FF] 
             ${ isPinned ? 'text-blue-800' : 'text-slate-500'}`}/>
        </div>

        <div className='flex justify-between items-center px-4 py-2   '>
           
            <p className='text-sm text-slate-900  truncate max-w-[80%]'>
              {`${content?.slice(0,30)}...` }
            </p>

            <FaRegEye 
            size={18}
            className='text-slate-400 cursor pinter  '
            onClick={()=> handleContentModal(content)}
            />  

         </div> 

        <Modal
          isOpen={openContentModal.isShown}
          style={{
            overlay:{
             backgroundColor:"rgba(0,0,0,0.2)"
            }
          }}
          className=" w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3  max-h-[80vh]  bg-fuchsia-200 rounded-2xl mx-auto mt-28  p-4 outline-none
           overflow-y-auto  shadow-2xl transition-all duration-300 ease-in-out  "
        >
           <ContentModal 
           data={content}
           onClose={()=> setOpenContentModal({isShown:false,data:null})}/>
            
        </Modal>

       

        <div className='flex items-center justify-between mt-2 flex-wrap pl-4 pr-4 pb-4 gap-2 '>
             <div className='text-sm text-slate-900   '>
              {tags.map((tag)=> `  #️ ${tag}`)}
             </div>

             <div className='flex items-center gap-2 '>
                <MdCreate
                 className='text-xl text-green-600 cursor-pointer  hover:text-green-800'
                 onClick={onEdit}
                />
                <MdDelete
                 className='text-xl text-red-500 cursor-pointer  hover:text-red-700'
                 onClick={onDelete}
                />
              </div>

        </div>
      </div>
  )
}

export default NoteCard
