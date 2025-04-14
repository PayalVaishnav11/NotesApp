import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is require "]
    },
    refreshToken : {
        type :String
    }

},{timestamps:true})

userSchema.pre("save", async function(next){
    if(! this.isModified("password"))  return ;

    this.password = await bcrypt.hash(this.password,10);

    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password , this.password)

}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(   // jaise hi jwt ka token generate hota hai ye usko return kar deta hai 
     {
         _id : this._id  , // mongoDb se lengy 
         email : this.email,
         fullName : this.fullName
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
       expiresIn : process.env.ACCESS_TOKEN_EXPIRY
     }
   )
}
userSchema.methods.generateRefreshToken = function (){
 return jwt.sign(   
   {
       _id : this._id  , // mongoDb se lengy 
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
     expiresIn : process.env.REFRESH_TOKEN_EXPIRY
   }
 ) 
}

export const User = mongoose.model("User",userSchema)