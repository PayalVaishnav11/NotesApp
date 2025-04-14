import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData: null
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload;
            console.log("state",state.userData)
        },
        logout:(state)=> {
            state.status = false;
            state.userData = null;
        },
        currentUser:(state,action)=> {
           state.status = true;
           state.userData = action.payload
        },
        registerUser:(state,action)=> {
            state.status = true;
            state.userData = action.payload;
        },
       
    }
})


export const {login,logout,currentUser,registerUser} = authSlice.actions

export default authSlice.reducer;
