import React, { useContext } from 'react';
import "./profileWindow.css";
import axios from 'axios';
import { server } from '../../App';
import { Context } from '../..';

const ProfileWindow = ({ username, email, followers, following, profilePhoto }) => {
    // const { profilePhoto } = useContext(Context);
    // console.log(username, email, followers, following);
    // console.log(profilePhoto)


    return (
        <div>
            <div className="profileWindow">
                <div className="userBackgroundImage">
                    <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="backgroundImage" />
                </div>

                <div className="userProfileInfo">
                    <div className="userProfilePhoto1st">
                        <div className='userProfilePhoto'>

                            <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="profilePhoto" />
                        </div>
                    </div>

                    <div className="userNameAndBio">
                        <p>{username}</p>
                        <span>{email}</span>
                    </div>

                    <div className="userFollowList">
                        <div className="userFollowings">
                            <p>{followers.length}</p>
                            <span>Followers</span>
                        </div>
                        <div className="userFollowers">
                            <p> {following.length}</p>
                            <span>Followings</span>
                        </div>
                        <div className="userPosts" style={{ border: "none" }}>
                            <p>31</p>
                            <span>Posts</span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfileWindow;