import React, { useContext, useEffect, useState } from 'react';
// import "./peopleWindow.css";
import axios from 'axios';
import { server } from '../../App';
import { Context } from '../..';


const ExploreFollowers = (userFollowerData) => {

    const { followersList, followingList, } = useContext(Context);

    const follwerData = userFollowerData.userFollowerData;
    const follwingData = userFollowerData.userFollowingData;

    return (
        <div className='mainPeopleWindow'>
            <div className="peopleWindowHeading">
                {
                    followingList && <h2>Following </h2>
                }
                {

                    followersList && <h2>Followers </h2>
                }

            </div>

            <div className="peopleWindow">

                {
                    follwerData && follwerData.map((i) => {
                        return <div className="userProfileBox" key={i._id}>
                            <div className="userProfilePicture">
                                <img src={`image/${i.profilePicture}`} alt="" />
                            </div>
                            <p>{i.name}</p>
                        </div>;
                    })
                }

                {
                    follwingData && follwingData.map((i) => {
                        return <div className="userProfileBox" key={i._id}>
                            <div className="userProfilePicture">
                                <img src={`image/${i.profilePicture}`} alt="" />
                            </div>
                            <p>{i.name}</p>
                        </div>;
                    })
                }

            </div>;




        </div >
    );
};

export default ExploreFollowers;;