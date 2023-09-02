import express from "express";
import {signup,get_profile,edit_profile_image,edit_profile} from "../controller/user.js"
import { verifyUser } from "../middleware/auth.js";


const router=express.Router()

router.post("/signup",signup)
router.get("/profile",verifyUser,get_profile)
router.patch("/edit_profile_image",verifyUser,edit_profile_image)
router.patch("/edit_profile",verifyUser,edit_profile)

export default router