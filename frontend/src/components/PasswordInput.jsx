import React, { useState } from 'react'
import {FaRegEye ,FaRegEyeSlash} from 'react-icons/fa6'

function PasswordInput({value,onChange,placeholder,className}) {

    const [isShowPassword,setIsShowPassword] = useState(false);

    return (
    <div className={` flex items-center  bg-white border-[1.5px] px-5   rounded mb-4 ${className} `}>
        <input
          value={value}
          onChange={onChange}
          type={isShowPassword? "text" : "password"} 
          placeholder={placeholder || "Password"}
          className='w-full text-sm bg-transparent  mr-3 py-3 rounded outline-none'
         />
         {
          isShowPassword ? 
          <FaRegEye 
           size={22} 
           className='text-[#2B85FF] cursor pinter'
           onClick={()=> setIsShowPassword(!isShowPassword)}
           /> : 
           <FaRegEyeSlash
           size={22}
           className='text-slate-400 cursor-pointer'
           onClick={()=> setIsShowPassword(!isShowPassword)}
           />
         }
       
    </div>
  )
}

export default PasswordInput
