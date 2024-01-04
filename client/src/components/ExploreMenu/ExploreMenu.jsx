import React, { useContext, useState } from 'react';
import "./exploreMenu.css";
import { AiOutlineCompass, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoIosColorPalette, IoMdNotificationsOutline } from "react-icons/io";
import { SlEnvolope } from "react-icons/sl";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { FaLeaf } from 'react-icons/fa';


const ExploreMenu = () => {
    const { setSavedPostWindow,
        homePage, setHomePage,
        savedPostsPage, setSavedPostsPage,
        likedPosts, setLikedPosts,
        accountSettings, setAccountSettings,
        setExplore
    } = useContext(Context);

    const [val, setVal] = useState();

    switch (val) {
        case "home":
            setHomePage(true); setSavedPostsPage(false); setLikedPosts(false); setExplore(false);
            // console.log("home");
            break;

        case "Saved":
            setSavedPostsPage(true); setHomePage(false); setLikedPosts(false); setExplore(false);
            // console.log("Saved");
            break;

        case "Like":
            setLikedPosts(true); setHomePage(false); setSavedPostsPage(false); setExplore(false);
            // console.log("Liked");
            break;

        case "Explore":
            setExplore(true); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false);
            break;


        default:
            setHomePage(true); setSavedPostsPage(false); setLikedPosts(false); setExplore(false);
        // console.log("Defauld");
    }

    return (
        <div className='exploreMenu'>
            <Link to={'/'} onClick={() => { setVal("home"); }}> <AiOutlineHome size={26} color='gray' />Home</Link>
            <Link to={'/'} onClick={() => { setVal("Explore"); }} > <AiOutlineCompass size={26} color='gray' />Explore</Link>
            <Link to={'/'} > <IoMdNotificationsOutline size={26} color='gray' />Notifications</Link>
            <Link to={'/'} > <SlEnvolope size={26} color='gray' />Messages </Link>
            <Link to={'/'} onClick={() => { setVal("Saved"); }}> < BsBookmarkCheck size={26} color='gray' />Saved Posts</Link>
            <Link to={'/'} > <IoIosColorPalette size={26} color='gray' />Thems</Link>
            <Link to={'/'} onClick={() => { setVal("Like"); }}> <BiLike size={26} color='gray' />Liked Posts</Link>
            <Link to={'/'} onClick={() => setAccountSettings(true)}> < AiOutlineSetting size={26} color='gray' />Settings</Link>

        </div >
    );
};

export default ExploreMenu;