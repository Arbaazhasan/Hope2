import express from "express";
import { User } from "../model/user.js";
import { Post } from "../model/post.js";
import jwt from "jsonwebtoken";



// Register User 
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            success: false,
            message: "User already Exits"
        });

        user = await User.create({
            name, email, password,
            profilePicture: "usericon.png",

        });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_URI);

        res.status(200).cookie("token", token, {
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            sameSite: "none",
            secure: true
        }).json({
            success: true,
            message: "Registerd Successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });

    }
};

// Login User

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email }).select("+password");;

        if (!user) return res.status(400).json({
            success: false,
            message: "User is not Exits!!"
        });


        if (password !== user.password) return res.status(400).json({
            success: false,
            message: "Password is not Matched"
        });

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_URI);

        res.status(200).cookie("token", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            sameSite: "none",
            secure: true
        }).json({
            success: true,
            message: "Login"
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        });
    }
};


// Get User Profile
export const getMyProfile = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            user: error.message
        });
    }

};


// Logout Profile
export const logout = (req, res) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true
    }).json({
        success: true,
        message: "Logout!!!"
    });
};


// Follow User
export const follow = async (req, res) => {
    const id = req.params.id;
    const { token } = req.cookies;
    const currentUserId = jwt.verify(token, process.env.JWT_URI);

    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(currentUserId._id);

            if (!followUser.followers.includes(currentUserId._id)) {
                await followUser.updateOne({ $push: { followers: currentUserId._id } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json({
                    success: true,
                    messsage: "User followed"
                });

            } else {
                await followUser.updateOne({ $pull: { followers: currentUserId._id } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json({
                    success: true,
                    messsage: "User Unfollowed"
                });

            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


export const getFollowersList = async (req, res) => {

    const getFollowersList = req.user.followers;
    const getFollowingList = req.user.following;

    let followersList = [];
    let followingList = [];

    await Promise.all(
        getFollowersList.map(async (i) => {
            // console.log(i);
            const getUser = await User.findById(i);
            if (!getUser) return console.log("User Not FOund");

            const isFollow = await getFollowingList.includes(getUser._id);
            // console.log(isFollow);

            const followerListObject = {
                _id: getUser._id,
                name: getUser.name,
                profilePicture: getUser.profilePicture ? getUser.profilePicture : "usericon.png",
                isFollow: isFollow,
            };

            followersList.push(followerListObject);
        })

    );

    console.log(followersList);


    await Promise.all(
        getFollowingList.map(async (i) => {
            // console.log(i);
            const getUser = await User.findById(i);
            if (!getUser) return console.log("User Not FOund");

            const followingListObject = {
                _id: getUser._id,
                name: getUser.name,
                profilePicture: getUser.profilePicture ? getUser.profilePicture : "usericon.png",
                isFollow: true,
            };
            console.log(followingListObject);

            followingList.push(followingListObject);
        })

    );


    res.status(200).json({
        success: true,
        followersList: followersList,
        followingList: followingList
    });

};



// Check isFollowed or IsFollowing User 

export const isfollowed = async (req, res) => {
    const userId = req.params.id;

    const userData = req.user.followers;

    const isFollowed = await userData.includes(userId);

    if (!isFollowed) return res.status(200).json({
        success: true,
        isfollow: false,
    });
    else {
        res.status(200).json({
            success: true,
            isfollow: true,
        });
    }
};


// Update user Profile Information
export const updateUserInfo = async (req, res) => {
    try {

        const { name, status, lives, bio, work } = req.body;
        // console.log(name, status, lives, bio, work);


        const userId = req.user._id.valueOf();


        let profilePhoto;

        if (!req.file) {
            profilePhoto;
        }
        else {
            profilePhoto = req.file.filename;
        }

        // console.log(profilePhoto);


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, status, lives, bio, work, profilePicture: profilePhoto },
            { new: true }
        );


        const userPostData = await Post.find({ userId });

        userPostData?.map(async (i) => {
            await Post.findByIdAndUpdate(
                i._id
                , {
                    username: name
                },
                {
                    new: true
                });
        });


        res.status(200).json({
            success: true,
            message: "Profile Update"
        });


    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        });
    }

};



export const getAllUsers = async (req, res) => {

    try {
        const allUsers = await User.find();

        res.status(200).json({
            success: true,
            allUsers: allUsers
        });
    } catch (error) {

        res.status(200).json({
            success: true,
            message: error
        });
    }
};