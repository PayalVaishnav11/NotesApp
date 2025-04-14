import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import InputBox from '../../components/InputBox';
import PasswordInput from '../../components/PasswordInput';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { BASE_URL } from '../../utils/constants.js';
import { registerUser } from '../../store/authSlice.js';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const [name,setName]  = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const validateEmail = (email)=> {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 }


  const handleSignup = async (e)=> {
    e.preventDefault();
    if(!name){
      setError("Please enter your name");
      return
    }
   
    if(!validateEmail(email)){
      setError("Please enter a valid email address!")
      return 
    }
    if(!password){
      setError("Please enter your password");
      return 
    }
    setError("")

    //signUp Api call
    try {
      const response = await  axiosInstance.post(`${BASE_URL}/register`,{
         fullName:name,
         email:email,
         password:password
      })

      if(response.data){

         const userData = response.data.data;
         console.log("registered user data:",response.data.data)

         if(userData) dispatch(registerUser( userData));

         const accessToken =userData.accessToken;
         localStorage.setItem("accessToken",accessToken);

         navigate("/dashboard")
      }
      
     } catch (error) {
         if(error){
          setError(error)
         }
         else{
          setError("An unexpected error occured .Please try again")
         }
     }

  }
  return (
   <>
    <NavBar/>
    <div className='flex items-center justify-center mt-28 rounded-2xl'>
      <div className='w-96 border rounded-xl bg-yellow-100 pb-6 '>
      <h4 className='text-2xl mb-7 bg-yellow-400 px-7 h-18 text-center pt-5 font-medium rounded-t-xl '>SignUp</h4>
         <form onSubmit={handleSignup}>

           

            <InputBox 
             type="text"
             placeholder="Name"
             value={name}
             onChange={(e)=> setName(e.target.value)}
             className='px-7 '
              />

             <InputBox 
             type="text"
             placeholder="Email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             className='px-7 '
              />

             <PasswordInput
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             className='mx-7 '
             />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            

            <button 
            type='submit'
            className='w-80 mx-auto  text-sm bg-fuchsia-600 text-white p-2 rounded my-1 hover:bg-fuchsia-800 duration-200 border ml-7 cursor-pointer '
            >Create Account
            </button>

            <p className='text-sm text-center mt-4'>
             Already have an account?{" "}
             <Link to="/login" className='font-medium text-fuchsia-800 underline'>
              Login
             </Link>
            </p>

          </form>
      </div>
    </div>
   </>
  )
}

export default SignUp
