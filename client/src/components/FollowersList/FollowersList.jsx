import React, { useContext, useEffect, useState } from 'react';
import "./followersList.css";
import { MdDeleteOutline } from "react-icons/md";
import { Context } from '../..';
import axios from 'axios';
import { server } from '../../App';
import { Link } from 'react-router-dom';




// const [setRefreshData] = useContext(Context);

const FollowersList = () => {


    const [userFollowers, setUserFollowers] = useState(true);
    const [userFollowing, setUserFollowing] = useState(false);

    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollwoingList] = useState([]);

    //Follow And UnFollow user  

    const followAndUnfollowUser = async (id) => {
        const data = await axios.put(`${server}/user/follow/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        // setRefreshData((pre) => !pre);
        console.log(data);
    };



    useEffect(() => {


        // Getting Followers and Follwoing List of user

        axios.get(`${server}/user/getfollowerslist`,
            {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            }).then((res) => {

                setFollowerList(res.data.followersList);
                setFollwoingList(res.data.followingList);
            }).catch((error) => {
                console.log(error);
            });


    }, []);



    return (
        <div>
            <div className="followersListWindwo">
                <div className='FollowersAndFollowing'>
                    <div onClick={() => { setUserFollowers(true); setUserFollowing(false); }}>{userFollowers ? <p style={{ color: "red" }}>Followers</p> : <p >Followers</p>}</div>
                    <div onClick={() => { setUserFollowing(true); setUserFollowers(false); }}>{userFollowers ? <p>Following</p> : <p style={{ color: "red" }}>Following</p>}</div>
                </div>


                <div className="userFollowersAndFollowing">



                    {
                        userFollowers && followerList.map((i) => {

                            return <div className="userFollowerTab" key={i._id}  >
                                <div className="followerProfileIcon">
                                    <img src={`image/${i.profilePicture}`} alt="FollowerProfileIcon" />
                                </div>

                                <div className="followerUsername">
                                    <Link to={"/"}>{i.name}</Link>
                                </div>

                                <div className="followBtn" onClick={() => followAndUnfollowUser(i._id)}>
                                    <span>{i.isFollow ? "Unfollow" : "Follow"}</span>
                                </div>
                            </div>;

                        })
                    }


                    {

                        userFollowing && followingList.map((i) => {

                            return <div className="userFollowerTab" key={i._id} >
                                <div className="followerProfileIcon">
                                    <img src={`image/${i.profilePicture}`} alt="FollowerProfileIcon" />
                                </div>

                                <div className="followerUsername">
                                    <Link to={"/"}>{i.name}</Link>
                                </div>

                                <div className="followBtn" onClick={() => followAndUnfollowUser(i._id)}>
                                    <span>{i.isFollow ? "Unfollow" : "Follow"}</span>
                                </div>
                            </div>;

                        })


                    }



                </div>
            </div>
        </div >
    );
};

export default FollowersList;