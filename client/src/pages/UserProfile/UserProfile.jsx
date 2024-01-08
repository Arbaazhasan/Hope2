import React, { useContext, useEffect, useState } from 'react';
// import "./profile.css";
import Bio from '../../components/Bio/Bio';
import ProfileWindow from '../../components/ProfileWindow/ProfileWindow';
import PostWindow from "../../components/PostWindow/PostWindow";
import FollowersList from '../../components/FollowersList/FollowersList';
import Peoples from '../../components/Peoples/Peoples';
import ProfileController from '../../components/ProfileController/ProfileController';
import { Context } from '../..';
import { Navigate } from 'react-router';
import axios from 'axios';
import { server } from '../../App';


const UserProfile = () => {

    const [userData, setUserData] = useState([]);


    const [userID, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [bio, setBio] = useState();
    const [status, setStatus] = useState();
    const [lives, setLives] = useState();
    const [work, setWork] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [postData, setPostData] = useState();




    const { isAuthonticated,
        setPostAccouont,
        refreshData,
        userProfileId,
    } = useContext(Context);


    useEffect(() => {

        // Geting User Own Posts from API
        axios.get(`${server}/post/getsearchuserpost/${userProfileId}`,
            {
                withCredentials: true
            }).then((res) => {

                // console.log(res.data.posts);
                setPostData(res.data.posts);



            }).catch((e) => {
                console.log(e);
            });
        setPostAccouont(true);




        // Getting User Profile Data

        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${server}/user/getuserprofiledata/${userProfileId}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                setUserData(data.userProfile);


            } catch (error) {
                console.log(error);
            }
        };

        fetchData();



    }, [refreshData, userProfileId]);



    useEffect(() => {
        // console.log(userData.followers);
        if (userData && userData.followers && userData.following && userData.profilePicture) {
            setFollowers(userData.followers);
            setFollowing(userData.following);
            setProfilePhoto(userData.profilePicture);

        }

        setUserId(userData._id);
        setUserName(userData.name);
        setUserEmail(userData.email);
        setBio(userData.bio);
        setStatus(userData.status);
        setLives(userData.lives);
        setWork(userData.work);

    }, [userData]);

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

                <ProfileWindow username={userName} email={userEmail} followers={followers} following={following} profilePhoto={profilePhoto} />

                {/* PostBar */}

                {/* <PostBar /> */}


                {/* User ALl Posts */}

                {
                    postData?.map((i) => (
                        < PostWindow id={i._id} userName={userName} profilePhoto={profilePhoto} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} key={i._id} />

                    ))

                }
                {/* <LikedPosts /> */}
            </div>
            <div className="profileRight">
                <FollowersList userId={userProfileId} />
                <Peoples />
            </div>
        </div>
    );
};

export default UserProfile;