import React from 'react'
import { useSelector } from 'react-redux';



function ProfileInfo({onLogout}) {

    const user = useSelector((state)=> state.auth.userData); 

    const getInitials = (name)=> {
        const words = name?.split(" ");
        let initials = "";

        for(let i= 0 ; i < Math.min(words?.length , 2); i++ ){
          initials += words[i][0];
        }
      
        return initials.toUpperCase();
      }

  return (
    <div className='flex items-center gap-3 '>

      { user &&
         <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100  text-xl '>
          {    getInitials(user?.fullName)  }
         </div>
      } 

         <div className=' px-2  flex flex-col'>
           <p className='text-lg font-medium text-white'>{  user?.fullName }</p>
           <button className='text-sm text-white underline cursor-pointer '
              onClick={onLogout}
           >
             {user ? "Logout": ""}
           </button>
         </div>
      
    </div>
  )
}

export default ProfileInfo
