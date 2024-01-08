import React, { useContext, useEffect, useState } from 'react';
import "./exploreMenu.css";
import { AiOutlineCompass, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IoIosColorPalette, IoMdNotificationsOutline } from "react-icons/io";
import { FaRegImages } from "react-icons/fa6";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaUserFriends } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";

import { Link } from 'react-router-dom';
import { Context } from '../..';
import { FaLeaf } from 'react-icons/fa';


const ExploreMenu = () => {
    const { setSavedPostWindow,
        homePage, setHomePage,
        savedPostsPage, setSavedPostsPage,
        likedPosts, setLikedPosts,
        accountSettings, setAccountSettings,
        setExplore, val, setVal,
        followersList, setFollowersList,
        followingList, setFollowingList,
        newFeed, setNewFeed,

        searchUser, setSearchUser
    } = useContext(Context);

    // const [val, setVal] = useState();

    // const handleNavigation = (selectedVal) => {
    //     setVal(selectedVal);
    // };



    useEffect(() => {
        switch (val) {
            case "home":
                setHomePage(true); setSavedPostsPage(false); setLikedPosts(false); setExplore(false); setAccountSettings(false); setFollowersList(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                // console.log("home");
                break;

            case "Saved":
                setSavedPostsPage(true); setHomePage(false); setLikedPosts(false); setExplore(false); setAccountSettings(false); setFollowersList(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                // console.log("Saved");
                break;

            case "Like":
                setLikedPosts(true); setHomePage(false); setSavedPostsPage(false); setExplore(false); setAccountSettings(false); setFollowersList(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                // console.log("Liked");
                break;

            case "Explore":
                setExplore(true); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false); setAccountSettings(false); setFollowersList(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                break;

            case "Settings":
                setAccountSettings(true); setExplore(false); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false); setFollowersList(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                break;

            case "FollowersList":
                setFollowersList(true); setAccountSettings(false); setExplore(false); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false); setFollowingList(false); setNewFeed(false); setSearchUser(false);
                break;

            case "FollowingList":
                setFollowingList(true); setFollowersList(false); setAccountSettings(false); setExplore(false); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false); setNewFeed(false); setSearchUser(false);
                break;


            case "NewFeed":
                setNewFeed(true); setFollowingList(false); setFollowersList(false); setAccountSettings(false); setExplore(false); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false); setSearchUser(false);
                break;

            case "SearchUser":
                setSearchUser(true); setNewFeed(false); setFollowingList(false); setFollowersList(false); setAccountSettings(false); setExplore(false); setLikedPosts(false); setHomePage(false); setSavedPostsPage(false);
                break;




            default:
                setHomePage(true); setSavedPostsPage(false); setLikedPosts(false); setExplore(false);
            // console.log("Defauld");
        }
    }, [val, searchUser]);


    return (
        <div className='exploreMenu'>
            <Link to={'/'} onClick={() => { setVal("home"); }}> <AiOutlineHome size={26} color='gray' />Home</Link>
            <Link to={'/'} onClick={() => { setVal("Explore"); }} > <AiOutlineCompass size={26} color='gray' />Explore</Link>
            <Link to={'/'} onClick={() => { setVal("FollowersList"); }}> <FaUserFriends size={26} color='gray' />Followers</Link>
            <Link to={'/'} onClick={() => { setVal("FollowingList"); }}> <LiaUserFriendsSolid size={26} color='gray' />Following </Link>
            <Link to={'/'} onClick={() => { setVal("Saved"); }}> < BsBookmarkCheck size={26} color='gray' />Saved Posts</Link>
            <Link to={'/'} onClick={() => { setVal("NewFeed"); }} > <FaRegImages size={26} color='gray' />New Feed</Link>
            <Link to={'/'} onClick={() => { setVal("Like"); }}> <BiLike size={26} color='gray' />Liked Posts</Link>
            <Link to={'/'} onClick={() => setVal("Settings")}> < AiOutlineSetting size={26} color='gray' />Settings</Link>

        </div >
    );
};

export default ExploreMenu;