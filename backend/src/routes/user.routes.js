import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser,getCurrentUser ,changeCurrentPassword} from "../controllers/user.controler.js";
import {addNote, deleteNote, editNote, getAllNotes, searchNotes, updatePinned} from "../controllers/note.controler.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route('/current-user').get(verifyJWT,getCurrentUser)
router.route('/change-password').post(verifyJWT,changeCurrentPassword)

router.route("/add-note").post(verifyJWT , addNote)
router.route("/edit-note/:noteId").put(verifyJWT ,editNote)
router.route("/get-all-notes/").get(verifyJWT,getAllNotes)
router.route("/delete-note/:noteId").delete(verifyJWT,deleteNote)
router.route("/update-note-pinned/:noteId").put(verifyJWT,updatePinned)
router.route("/search-notes/").get(verifyJWT,searchNotes)

export default router