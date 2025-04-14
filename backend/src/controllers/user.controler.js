 import asyncHandler from '../utils/asyncHandler.js';
 import {ApiError} from "../utils/ApiError.js";
 import {User} from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
    try {

          const user = await User.findById(userId)
          const accessToken = await  user.generateAccessToken()
          const refreshToken =  await user.generateRefreshToken()

         user.refreshToken =refreshToken;
    
         await user.save({validateBeforeSave  : false})   // save the refresh token in database
         
         return { accessToken  ,refreshToken}
    } catch (error) {
        throw  new ApiError(500, " Somthing went wrong while  generating Access and Referesh Tokens")
    }
}

 const registerUser = asyncHandler( async (req,res)=> {
     //get user detials from frontend
     //validation-not empty 
     //check if user already exists- fullName , email
     //create user object -create entry in Db
     //remove password and reffresh token from response
     //check for user creation
     //return res

     const {fullName , email, password} =  req.body;

     console.log("fullName:",fullName);
     console.log("email",email);

     if(
        [fullName,email,password].some((field)=> field?.trim() === "")
     ){
         throw new ApiError(400,"All fields are required !");
     }

     const existedUser = await  User.findOne({ $or:[{fullName},{email}]})

     if(existedUser){
        throw new ApiError(409,"User with username or email already exsits")
     }

     const user = await User.create({
       email,
       fullName,
       password
     })

    //  const createdUser = await User.findById(user._id).select(
    //     "-password -refreshToken "
    //  );

    //  if(!createdUser){
    //     throw new ApiError(500,"Something went wrong while registering the user");
    //  }
     const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id);
     const createdUser = await User.findById(user._id).select("-password -refreshToken");

     const options = {
        httpOnly:true,
        secure:true
     }

     return res
     .status(201)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     
     .json(
        new ApiResponse(
            200,
            {
             user:createdUser, accessToken, refreshToken
            },
            "User registered and logged in  successfully ")
     )
 })

 const loginUser = asyncHandler( async (req,res)=> {
     // req.body --> data
     //username or email 
     // find th euser 
     // password check
     //access and refresh token 
     //send the cookie

     const { email , password } = req.body;

     if( !(email && password)){
        throw new ApiError(400, "email and password is required")
     }

     const user = await User.findOne({email});

     if(!user){
        throw new ApiError(404 , "User does not exists")
     }

     const isPasswordValid = await user.isPasswordCorrect(password);
     
     if(!isPasswordValid){
        throw new ApiError(401 , "invalid user credentials")
     }

     const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id);

     console.log("access token:",accessToken);
     console.log("refresh token:",refreshToken);

     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

     const options = {
        httpOnly:true,
        secure:true
     }

     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "user Logged in successfully"
        )
     )


 })

 const logoutUser =asyncHandler( async (req,res)=> {
    //remover refresh token from database
    //clear cookies

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new : true
        }
    )
    
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged out")
    )

 })

 const refreshAccessToken = asyncHandler ( async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken ||  req.body.refreshToken ;


    if( ! incomingRefreshToken ){
       throw new ApiError( 401 , " Unauthorized  request")
    }

    try {
       const decodedToken  = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET 
       )
  
       const user = await User.findById(decodedToken?._id)
  
       if(! user){
          throw new ApiError( 401 , " Invalid refresh Token ")
      }
  
      if(incomingRefreshToken !== user?.refreshToken){
          throw new ApiError(401 , " Refresh Token is expired or Used")
      }
  
      const {accessToken , refreshToken } =  await generateAccessAndRefereshTokens(user._id)

  
      const options= {
          httpOnly:true , 
          secure : true 
      }
  
      return res
      .status(200)
      .cookie("accessToken" , accessToken , options)
      .cookie("refreshToken", refreshToken , options)
      .json(
          new ApiResponse(
              200,
              {
                  accessToken,
                  refreshToken 
              },
              "Access Token refreshed ! "
          )
      )
    } catch (error) {
         throw new ApiError (401 , error?.message  || "Invalid refresh Token ")

       
    }

})

const getCurrentUser = asyncHandler( async(req,res)=> {

    console.log("inside backend current user:",req.user)

    return res
    .status(200)
    .json(
      new ApiResponse(
          200,
          req.user,
          "current user fetched successfully!"
      )
    )

})

const changeCurrentPassword = asyncHandler( async(req,res)=> {
    const {oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
    }
    user.password = newPassword;
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password  changed  successfully"
        )
    )
})



 export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword
}