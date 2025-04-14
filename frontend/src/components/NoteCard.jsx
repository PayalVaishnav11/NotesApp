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
    <div className='border rounded  hover:shadow-xl  transition-all ease-in-out flex flex-col flex-wrap bg-yellow-100 rounded-t-2xl '>
        
        <h6 className='text-lg font-medium text-wrap bg-yellow-500 h-10 px-4 pt-2 rounded-t-2xl'>{title}</h6>
        <div className='flex items-center justify-between flex-wrap pl-4 pr-4 '>
             <div>
               
                <span className='text-sm text-slate-900'>{moment(date).format('Do MMM YYYY')}</span>
             </div>
             <MdOutlinePushPin 
             size={22}
             onClick={onPinNote}
             className={`text-xl  cursor-pointer hover:text-[#2B85FF] 
                ${ isPinned ? 'text-blue-800' : 'text-slate-300'}`}/>
        </div>

        <div className='py-3 flex items-center justify-between pl-4 pr-4 '>
           
            <p className='text-sm text-slate-900 mt-2  '>
              {`${content?.slice(0,40)}...` }
            </p>

            <FaRegEye 
            size={18} 
            className='text-slate-400 cursor pinter'
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
          className="w-1/3  h-1/3 bg-yellow-300 rounded-2xl mx-auto mt-28 outline-none  "
        >
           <ContentModal 
           data={content}
           onClose={()=> setOpenContentModal({isShown:false,data:null})}/>
            
        </Modal>

       

        <div className='flex items-center justify-between mt-2 flex-wrap pl-4 pr-4 pb-4 gap-2 '>
             <div className='text-sm text-slate-900  '>
              {tags.map((tag)=> `#${tag}`)}
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
