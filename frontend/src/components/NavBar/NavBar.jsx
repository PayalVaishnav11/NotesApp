import React, { useState } from 'react'
import ProfileInfo from '../ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../store/authSlice.js';
import { useSelector } from 'react-redux';


function NavBar({onSearchNote,handleClearSearch}) {
  const [searchQuery,setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInNavBar = useSelector((state)=> state.auth.userData);

  const onLogout = ()=> {
      localStorage.clear();
      dispatch(currentUser(""))
      navigate('/login');
  }

  const handleSearch = ()=> {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
     
  };
  const onClearSearch = ()=> {
    handleClearSearch();
    setSearchQuery("")
  }
  return (
    <div className={`flex  flex-col sm:flex-row items-center px-6 py-2  shadow ${ userInNavBar ? 'justify-between' : 'justify-center ' }  gap-2.5 bg-fuchsia-900 ` }>
       <div className='flex   justify-center items-center'>
          <h2 className='text-2xl font-medium text-white  '>NOTES</h2>
          <img src="..\images\note-logo.png" width={60} />
       </div>
        <SearchBar 
        value = {searchQuery}
        onChange={(e)=> setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch} />
        <ProfileInfo  onLogout={onLogout} />
    </div>
    
  )
}

export default NavBar
