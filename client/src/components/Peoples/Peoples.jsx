import React, { useEffect, useState } from 'react';
import "./peoples.css";
import axios from 'axios';
import { server } from '../../App';

const Peoples = () => {
    const [getAllusers, setGetAllusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${server}/user/getallusers`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            setGetAllusers(res.data.allUsers);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <div className="peoplesWindow">
                <div className='youWantToKnow'>
                    <h3>You want to know</h3>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading data</p>
                ) : (
                    <div className="peopleTabs">
                        {getAllusers.map((user) => (
                            <div key={user.id} className="peopleTab">
                                <div className="peopleProfileIcon">
                                    <img src={`image/${user.profilePicture}`} alt="ProfileIcon" />
                                </div>
                                <div>
                                    <div>
                                        <p>{user.name}</p>
                                    </div>
                                    <span>UnFollow</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="morePeoples">
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};

export default Peoples;
