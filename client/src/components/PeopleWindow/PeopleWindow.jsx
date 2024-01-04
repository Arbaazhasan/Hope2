import React, { useEffect, useState } from 'react';
import "./peopleWindow.css";
import axios from 'axios';
import { server } from '../../App';


const PeopleWindow = () => {

    const [peopleAlluserData, setPeopleAlluserData] = useState([]);

    useEffect(() => {

        // Fetching All User from the Database 


        try {
            axios.get(`${server}/user/getallusers`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }).then((res) => {
                setPeopleAlluserData(res.data.allUsers);

                // console.log(peopleAlluserData);


            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {

            console.log(error);
        }


    }, []);


    return (
        <div className='mainPeopleWindow'>
            <div className="peopleWindowHeading">
                <h2>Know More People </h2>
            </div>

            <div className="peopleWindow">


                {
                    peopleAlluserData.map((i) => {
                        return <div className="userProfileBox" key={i._id}>
                            <div className="userProfilePicture">
                                <img src={`image/${i.profilePicture ? i.profilePicture : "usericon.png"}`} alt="" />
                            </div>
                            <p>{i.name}</p>
                            <div><button>Follow</button>
                            </div>
                        </div>;
                    }
                    )
                }


            </div>
        </div>
    );
};

export default PeopleWindow;