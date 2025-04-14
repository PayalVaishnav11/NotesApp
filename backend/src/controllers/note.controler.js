import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { Note } from "../models/note.model.js";

const addNote = asyncHandler( async(req,res)=> {
    const {title,content,tags} = req.body;

    const user = req.user;

    if( !(title && content)){
        throw new ApiError(400,"title and content are required !")
    }

    const note =await  Note.create({
        title,
        content,
        tags:tags || [],
        userId:user._id
    })
    console.log("note:",note)
    if(!note){
        throw new ApiError(500,"Something went wrong while adding note")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,note,"note added Successfully!")
    )
})


const editNote = asyncHandler( async(req,res)=> {
    const {title,content,tags,isPinned} = req.body;
    const noteId = req.params.noteId

    if( !title && !content && !tags){
         throw new ApiError(400, "No changes provided ")
    }
    console.log("req.user:",req.user)

    const note = await Note.findOne({ _id: noteId, userId: req.user?._id});

    if(!note){
        throw new ApiError(404,"Note not found")
    }
    note.title = title;
    note.content = content;
    note.tags = tags;
    note.isPinned = isPinned;

    await note.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200,note,"Note edited Successfulyy")
    )

})

const getAllNotes = asyncHandler( async(req,res)=> {

      const notes = await Note.find({userId: req.user?._id}).sort({isPinned:-1});

      if(!notes){
        throw new ApiError(400,"Somthing went wrong while retriving notes")
      }
//   console.log("notes:",notes);
     return res
      .status(200)
      .json(
         new ApiResponse(200,notes, "All notes retrived Successfully")
      )
})

const deleteNote = asyncHandler(async(req,res)=> {

    const noteId = req.params.noteId;

    const note = await Note.findOne({ _id: noteId, userId: req.user?._id});

    if(!note){
        throw new ApiError(404,"Note not found")
    }
    
    await Note.deleteOne({_id:noteId,userId:req.user?._id})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Note deleted Successfulyy")
    )

})

const updatePinned= asyncHandler(async(req,res)=> {
    const {isPinned} = req.body;
    const noteId = req.params.noteId
    
    const note = await Note.findOne({ _id: noteId, userId: req.user?._id});

    if(!note){
        throw new ApiError(404,"Note not found")
    }
    note.isPinned = isPinned;

    await note.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200,note," Pinned Updated  Successfulyy")
    )

})

const searchNotes = asyncHandler( async(req,res)=> {
     const user = req.user;
     const {query} = req.query;

     if(!query){
        throw new ApiError(400,"Search query is required")
     }
     const matchingNote = await Note.find({
        userId:user._id,
        $or:[
            { title : {$regex : new RegExp(query,"i")} },
            { content : {$regex : new RegExp(query,"i")} }
        ]

     })

     if(!matchingNote){
        throw new ApiError(500,"Something went wrong while searching notes")
     }

     return res
     .status(200)
     .json(
        new ApiResponse(200,matchingNote,"Notes matching the search query retrieved successfully")
     )
})

export {
    addNote,
    editNote,
    getAllNotes,
    deleteNote,
    updatePinned,
    searchNotes
}