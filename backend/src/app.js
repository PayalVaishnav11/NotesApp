import express from 'express';
import cors from 'cors';
import cookieParser from   'cookie-parser';

const app = express();

app.get("/",(req,res)=> {
    res.send({data:"Payal"})
})

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended :true , limit:"16kb"}))
app.use(express.static("public"))  // to make public assests 
app.use(cookieParser())
//app.use    ham tab use karengy jab hamne koi middleware ya koi configuration setting use karni hai 

//routes import 
import userRouter from "./routes/user.routes.js";

//routes declaration 
app.use("/api/v1/users",userRouter)

//   http://localhost:8000/api/v1/users/register

export {app}
