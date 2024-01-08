import express from "express";
import { follow, followingPost, getAllUsers, getFollowersList, getMyProfile, getUserProfile, getUserProfileData, isfollowed, login, logout, register, updateUserInfo } from "../controller/user.js";
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
router.get("/getfollowerslist/:id", isAuthonticated, getFollowersList);
router.get("/isfollowed/:id", isAuthonticated, isfollowed);
router.get("/getallusers", isAuthonticated, getAllUsers);
router.get("/getUserProfile/:username", isAuthonticated, getUserProfile);
router.get("/followingpost", isAuthonticated, followingPost);
router.get("/getuserprofiledata/:userid", isAuthonticated, getUserProfileData);


export default router;