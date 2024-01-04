import React from 'react';
import { AiOutlineHome, AiOutlineLike, AiOutlineSetting } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import "./profileController.css";
import { Link } from "react-router-dom";

const ProfileController = () => {
    return (
        <div className="ProfileController">


            <Link to={"/"}><AiOutlineHome size={25} color={"gray"} /> Home</Link>
            <Link to={"/"}><AiOutlineLike size={25} color={"gray"} /> Liked</Link>
            <Link to={"/"}><BsBookmarkCheck size={25} color={"gray"} /> Bookmark</Link>
            <Link to={"/"}><AiOutlineSetting size={25} color={"gray"} /> Settings</Link>
        </div>
    );
};

export default ProfileController;