import React, { useEffect, useState } from 'react';
import "./peoples.css";
import axios from 'axios';
import { server } from '../../App';


const Peoples = () => {

    const [getAllusers, setGetAllusers] = useState([]);

    useEffect(() => {
        axios.get(`${server}/user/getallusers`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }).then((res) => {
            setGetAllusers(res.data.allUsers);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <div className="peoplesWindow">
                <div className='youWantToKnow'>
                    <h3>You want to know</h3>
                </div>
                <div className="peopleTabs">


                    {
                        getAllusers.map((i) => {
                            return <div className="peopleTab">
                                <div className="peopleProfileIcon">
                                    <img src={`image/${i.profilePicture}`} alt="ProfileIcon" />
                                </div>
                                <div>
                                    <div>
                                        <p>{i.name}</p>
                                    </div>

                                    <span>UnFollow</span>
                                </div>
                            </div>;

                        })
                    }



                </div>
                <div className="morePeoples">
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};

export default Peoples;