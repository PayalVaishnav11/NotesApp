//this middleware will verify  if user is there or not 
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Note } from "../models/note.model.js";

export const verifyJWT = asyncHandler( async(req,res,next)=> {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401 , "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
       // console.log("decodedToken:",decodedToken);
    
       const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
       // console.log("user:",user);
    
       if(!user){
        throw new ApiError(401, "Invalid Access Token")
       }
       
       req.user = user;
    //    console.log("req.user",req.user);
       next()
   
      } catch (error) {
          throw new ApiError(401 , error?.message  || "Inavlid access token")
      }
})

