import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import InputBox from '../../components/InputBox'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput';
import axios from "axios";
import { BASE_URL } from '../../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import {login as storeLogin} from '../../store/authSlice.js'
import axiosInstance from '../../utils/axiosInstance.js';



function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const validateEmail = (email)=> {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const handleLogin =  async (e)=> {
     e.preventDefault();
     if(!validateEmail(email)){
        setError("Please enter a valid email address");
        return ;
     }
     if(!password){
      setError("Please enter the password")
      return ;
     }
     setError("");

     //login APi call

     try {
      const response = await axiosInstance.post(`${BASE_URL}/login`,{
         email:email,
         password:password
      })
      console.log("response:",response);

      if(response.data){
         const userData = response.data.data.user;
         if(userData) dispatch(storeLogin( userData))
         
         const accessToken = response.data.data.accessToken;
         localStorage.setItem("accessToken",accessToken);

         navigate("/dashboard")
      }
      
     } catch (error) {
        console.log("error:",error)
        setError("Invalid User Credentials")
        
     }

  }

  return (
    <div>
     <NavBar/>
     
     <div className='flex items-center justify-center mt-28  '>
       <div className='w-96 bg-yellow-100   rounded-t-4xl h-96 rounded-b-xl  mx-5'>
           <h4 className='bg-yellow-400  h-18 text-2xl text-center pt-5 rounded-t-xl  font-medium'>Login</h4>
          <form onSubmit={handleLogin} className=' mx-7 my-10'>
             
             <InputBox 
             className=''
             type="text"
             placeholder="Email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             label="Email" />

             <PasswordInput
             className='bg-white'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             />

             {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            

             <button 
             type='submit'
             className='w-full text-sm  bg-fuchsia-600 text-white p-2 rounded my-1 hover:bg-fuchsia-800 border duration-200'
             >Login
             </button>

             <p className='text-sm text-center mt-4'>
              Not Registered yet?{" "}
              <Link to="/signup" className='font-medium text-fuchsia-500 underline'>
               Create An Account
              </Link>
             </p>

          </form>
         
       </div>

     </div>

    </div>
  )
}

export default Login
