import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from '../../components/AddEditNotes';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import axiosInstance from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../store/authSlice.js';
import Toast from '../../components/Toast.jsx';
import EmptyCard from '../../components/EmptyCard.jsx';
import addNoteImg from '../../../images/notesImg.png';
import noDataImg from '../../../images/noDataImg.png';

function Home() {
  
  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null
  })
  const [showToastMsg,setShowToastMsg] = useState({
       isShown:false,
       message:"",
       type:"add"
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allNotes,setAllNotes] = useState([]);
  const [isSearch,setIsSearch] = useState(false);

  const handleEdit = (noteDetails)=> {
    setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"})
  }
  const showToastMessage = (message,type)=> {
    setShowToastMsg({
      isShown:true,
       message,
       type
    })
  }

  const handleCloseToast = ()=> {
    setShowToastMsg({
      isShown:false,
       message:"",
    })
  }

  const getUserInfo = async ()=> {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/current-user`);

        if(response.data){
          const userInfo = response.data.data;
          if(userInfo) dispatch(currentUser(userInfo));
        }
        
      } catch (error) {
         console.log("error",error);
         if(error){
          localStorage.clear();
          navigate("/login")
         }
        
      }
  }

  const getAllNotes = async ()=> {
       try {
         const response = await axiosInstance.get("/get-all-notes");

         if(response.data){
             setAllNotes(response.data.data)
         }
        
       } catch (error) {
          console.log("An error occured while getting all notes");
       }
  }

  const deleteNote = async (data)=> {

       const noteId = data._id;
         try {
           const response = await axiosInstance.delete("/delete-note/"+ noteId)
           console.log("add note response",response);
           if(response.data){
            showToastMessage("Note Deleted Successfully","delete")
            getAllNotes();
          }
     
        } catch (error) {
           setError(error)
           console.log("something went wrong while deleting note")
           }
  }

  const onSearchNote = async (query)=> {
    try {
       const response = await axiosInstance.get("/search-notes",{
          params:{query}
       });

       if(response.data){
           setIsSearch(true);
           setAllNotes(response.data.data)
       }
      
    } catch (error) {
       console.log(error)
      
    }
  }

  const handleClearSearch = ()=> {
    setIsSearch(false)
    getAllNotes();
  }

  const updateIsPinned = async (noteData)=> {
      const noteId = noteData._id;
      try {
        const response = await axiosInstance.put("/update-note-pinned/"+ noteId,
          {
             isPinned: !noteData.isPinned 
          }
        )
        if(response.data){
         showToastMessage("Note Updated Successfully")
         getAllNotes();
        }
      }
      catch (error) {
       console.log(error)
      }
    }

  useEffect(()=> {
      getUserInfo();
      getAllNotes();
  },[])


  return (
   <>
        <NavBar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
        <div className='mx-auto '>
          { allNotes?.length > 0 ? 
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8   px-32  
              '>
              {
                allNotes.map((note,index)=> (
                 
                  <NoteCard
                  key={note._id}
                  title={note.title}
                  date={note.createdAt}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={()=> handleEdit(note)}
                  onDelete={()=> deleteNote(note)}
                  onPinNote={()=> updateIsPinned(note)}
                  />

                ))
              }
           </div>  
           :
           <EmptyCard
            imgSrc={isSearch ? noDataImg : addNoteImg }
            message={isSearch ? `Oops ! No notes found matching your search .`:`Start creating your first note ! Click the 'Add' button to jot down your thoughts, ideas, and reminders . Lets's get started! `}
           />
          }
        </div>

        <button 
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-fuchsia-400 hover:bg-fuchsia-600 absolute right-10 bottom-10'
        onClick={()=> {
          setOpenAddEditModal({isShown:true,type:"add" , data:null})
        }}
        >
          <MdAdd className='text-[32px]  text-white'/>
        </button>

        

        <Modal
         isOpen = {openAddEditModal.isShown}
         onRequestClose = {()=> {}}
         style={{
           overlay:{
            backgroundColor:"rgba(0,0,0,0.2)"
           }

          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white   mx-auto mt-14 p-5 overflow-y-scroll "
        >
           <AddEditNotes 
           type={openAddEditModal.type}
           noteData={openAddEditModal.data}
           onClose={()=> setOpenAddEditModal({isShown:false,type:"add",data:null})}
           getAllNotes={getAllNotes}
           showToastMessage={showToastMessage}
           />
        </Modal>

        <Toast
        isShown={showToastMsg.isShown}
        message = {showToastMsg.message}
        type= {showToastMsg.type}
        onClose={handleCloseToast}
        />
   </>
  )
}

export default Home
