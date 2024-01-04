import express from "express";
import { follow, getAllUsers, getFollowersList, getMyProfile, isfollowed, login, logout, register, updateUserInfo } from "../controller/user.js";
import { isAuthonticated } from "../middleware/auth.js";
import { upload } from "../controller/post.js";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/follow/:id", isAuthonticated, follow);
router.get("/me", isAuthonticated, getMyProfile);
router.get("/logout", logout);
router.put("/updateInfo", isAuthonticated, upload.single('profilePicture'), updateUserInfo);
router.get("/getfollowerslist", isAuthonticated, getFollowersList);
router.get("/isfollowed/:id", isAuthonticated, isfollowed);
router.get("/getallusers", isAuthonticated, getAllUsers);


export default router;