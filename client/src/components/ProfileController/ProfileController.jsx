import React, { useContext } from 'react';
import { AiOutlineHome, AiOutlineLike, AiOutlineSetting } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import "./profileController.css";
import { Link } from "react-router-dom";
import { Context } from '../..';

const ProfileController = () => {

    const { setVal } = useContext(Context);

    return (
        <div className="ProfileController">


            <Link to={"/"}><AiOutlineHome size={25} color={"gray"} /> Home</Link>
            <Link to={"/"} onClick={() => { setVal("Like"); }}><AiOutlineLike size={25} color={"gray"} /> Liked</Link>
            <Link to={"/"} onClick={() => { setVal("Saved"); }}><BsBookmarkCheck size={25} color={"gray"} /> Saved Posts</Link>
            <Link to={"/"} onClick={() => { setVal("Settings"); }} ><AiOutlineSetting size={25} color={"gray"} /> Settings</Link>
        </div>
    );
};

export default ProfileController;