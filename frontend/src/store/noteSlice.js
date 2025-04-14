import {createSlice} from "@reduxjs/toolkit";

const noteInitialState = {
    status:false,
    noteData:null
}

const noteSlice = createSlice({
    name:"note",
    noteInitialState,
    reducers:{
        allNotes:(state,action)=> {
            state.status = true,
            state.noteData = action.payload
              
        }

    }

})

export const allNotes = noteSlice.actions;
export default noteSlice.reducer;