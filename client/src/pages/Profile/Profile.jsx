import React, { useContext, useEffect, useState } from 'react';
import "./profile.css";
import Bio from '../../components/Bio/Bio';
import ProfileWindow from '../../components/ProfileWindow/ProfileWindow';
import PostBar from "../../components/PostBar/PostBar";
import PostWindow from "../../components/PostWindow/PostWindow";
import FollowersList from '../../components/FollowersList/FollowersList';
import Peoples from '../../components/Peoples/Peoples';
import ProfileController from '../../components/ProfileController/ProfileController';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';
import LikedPosts from '../../components/LikedPosts/LikedPosts';
import { Context } from '../..';
import { Navigate } from 'react-router';
import axios from 'axios';
import { server } from '../../App';
import toast from 'react-hot-toast';


const Profile = () => {


    const { isAuthonticated, setIsAuthonticated,
        userName,
        userEmail,
        followers,
        following,
        bio,
        status,
        lives,
        work,
        postData, setPostData,
        setPostAccouont,
        profilePhoto,
        refreshData,
    } = useContext(Context);


    useEffect(() => {

        // Geting User Own Posts from API
        axios.get(`${server}/post/getmyposts`,
            {
                withCredentials: true
            }).then((res) => {
                // console.log(res.data.posts);
                setPostData(res.data.posts);



            }).catch((e) => {
                console.log(e);
            });
        setPostAccouont(true);

    }, [refreshData]);



    if (!isAuthonticated) return <Navigate to={'/login'} />;

    return (

        <div className="profilePage">
            <div className="profileLeft">
                <div className="profileLeftContent">
                    <Bio bio={bio} status={status} lives={lives} work={work} />
                    <ProfileController />
                </div>
            </div>
            <div className="profileCenter">

                {/* User Profile Window */}

                <ProfileWindow username={userName} email={userEmail} followers={followers} following={following} />

                {/* PostBar */}

                <PostBar />


                {/* User ALl Posts */}

                {
                    postData?.map((i) => (
                        < PostWindow id={i._id} userName={userName} profilePhoto={profilePhoto} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} key={i._id} />

                    ))

                }
                {/* <LikedPosts /> */}
            </div>
            <div className="profileRight">
                <FollowersList />
                <Peoples />
            </div>
        </div>
    );
};

export default Profile;