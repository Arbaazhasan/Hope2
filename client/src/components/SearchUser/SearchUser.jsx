import React, { useContext, useEffect, useState } from 'react';
// import "./peopleWindow.css";
import axios from 'axios';
import { server } from '../../App';
import { Context } from '../..';
import { Link } from 'react-router-dom';



const SearchUser = () => {

    const { searchUserData, userProfileId, setUserProfileId, setIsSearch } = useContext(Context);

    const clickHandler = (id) => {
        setUserProfileId(id);
        setIsSearch(true);
    };


    return (
        <div className='mainPeopleWindow'>

            <div className="peopleWindow">

                {
                    searchUserData.isUser ? (
                        searchUserData.userData.map((i) => (
                            <Link to={"/userprofile"} style={{ textDecoration: "none", color: "black" }} onClick={() => clickHandler(i._id)} key={i._id}>
                                <div className="userProfileBox" >
                                    <div className="userProfilePicture">
                                        <img src={`image/${i.profilePicture}`} alt="" />
                                    </div>
                                    <p>{i.name}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div style={{ fontSize: "larger", color: "gray" }}><p>User not Found</p></div>
                    )
                }




            </div>;




        </div >
    );
};

export default SearchUser;;