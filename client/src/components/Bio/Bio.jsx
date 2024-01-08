import React, { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";

import "./Bio.css";
import UpdateInfo from '../UpdateInfo/UpdateInfo';
import { Link } from 'react-router-dom';

const Bio = ({ bio, status, lives, work }) => {


    const [checkUrl, setCheckUrl] = useState();

    useEffect(() => {
        const path = window.location.pathname;
        // console.log(path);
        setCheckUrl(path);
    }, []);



    return (
        <div className="userInfo">
            <div>

                <div id="popup1" className='UpateProfileBioInfo' ><UpdateInfo /></div>

                <h3>Your Info</h3>
                {/* <a href="#popup1"> <BiSolidEdit size={30} /></a> */}


                {
                    checkUrl === "/profile" ? <Link to={'/updateUserInfo'} ><BiSolidEdit size={30} /></Link> : ""
                }

            </div>

            <div>
                <p><strong>Bio </strong>{bio}</p>
                <p><strong>Status in </strong>{status}</p>
                <p><strong>Lives in </strong>{lives} </p>
                <p><strong>Works at </strong>{work}</p>
            </div>
        </div>
    );
};

export default Bio;