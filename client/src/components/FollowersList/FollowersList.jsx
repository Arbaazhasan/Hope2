import React, { useContext, useEffect, useState } from 'react';
import "./followersList.css";
import { MdDeleteOutline } from "react-icons/md";
import { Context } from '../..';
import axios from 'axios';
import { server } from '../../App';
import { Link } from 'react-router-dom';




// const [setRefreshData] = useContext(Context);

const FollowersList = ({ userId }) => {
    // console.log(userId);
    const { user, isSearch, userProfileId, setUserProfileId } = useContext(Context);
    // console.log(userId);

    const [userFollowers, setUserFollowers] = useState(true);
    const [userFollowing, setUserFollowing] = useState(false);

    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollwoingList] = useState([]);

    const [searchUserFollowerList, setSearchUserFollowerList] = useState([]);
    const [searchUserFollowingList, setSearchUserFollwoingList] = useState([]);



    const [reFreshData, setReFreshData] = useState(false);

    const [checkUrl, setCheckUrl] = useState(false);




    //Follow And UnFollow user  

    const followAndUnfollowUser = async (id) => {
        const data = await axios.put(`${server}/user/follow/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        setReFreshData((pre) => !pre);
        // console.log(data);

    };



    useEffect(() => {

        const path = window.location.pathname;
        setCheckUrl(path);


        // Fetching User Follwoers and Following 


        try {


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
        } catch (error) {
            console.log(error);

        }


        try {

            if (userId) {
                axios.get(`${server}/user/getSearchUserFollowersList/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }, withCredentials: true
                    }).then((res) => {

                        setSearchUserFollowerList(res.data.followersList);
                        setSearchUserFollwoingList(res.data.followingList);

                    }).catch((error) => {
                        console.log(error);
                    });

            }
        } catch (error) {
            console.log(error);

        }




    }, [reFreshData]);



    return (
        <div>
            {

                checkUrl === "/profile" ?

                    <div className="followersListWindwo">
                        <div className='FollowersAndFollowing'>
                            <div onClick={() => { setUserFollowers(true); setUserFollowing(false); }}>{userFollowers ? <p style={{ color: "rgb(107, 74, 224)" }}>Followers</p> : <p >Followers</p>}</div>
                            <div onClick={() => { setUserFollowing(true); setUserFollowers(false); }}>{userFollowers ? <p>Following</p> : <p style={{ color: "rgb(107, 74, 224)" }}>Following</p>}</div>
                        </div>


                        <div className="userFollowersAndFollowing">



                            {
                                userFollowers && followerList.map((i) => {

                                    return <div className="userFollowerTab" key={i._id}  >
                                        <div className="followerProfileIcon">
                                            <img src={`image/${i.profilePicture}`} alt="FollowerProfileIcon" />
                                        </div>

                                        <div className="followerUsername">
                                            <Link to={"/userprofile"} onClick={() => { setUserProfileId(i._id); }}>{i.name}</Link>
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
                                            <Link to={"/userprofile"} onClick={() => { setUserProfileId(i._id); }}>{i.name}</Link>
                                        </div>

                                        <div className="followBtn" onClick={() => followAndUnfollowUser(i._id)}>
                                            <span>{i.isFollow ? "Unfollow" : "Follow"}</span>
                                        </div>
                                    </div>;

                                })


                            }



                        </div>
                    </div>




                    :



                    // const [searchUserFollowerList, setSearchUserFollowerList] = useState([]);
                    // const [searchUserFollowingList, setSearchUserFollwoingList] = useState([]);



                    <div className="followersListWindwo">
                        <div className='FollowersAndFollowing'>
                            <div onClick={() => { setUserFollowers(true); setUserFollowing(false); }}>{userFollowers ? <p style={{ color: "rgb(107, 74, 224)" }}>Followers</p> : <p >Followers</p>}</div>
                            <div onClick={() => { setUserFollowing(true); setUserFollowers(false); }}>{userFollowers ? <p>Following</p> : <p style={{ color: "rgb(107, 74, 224)" }}>Following</p>}</div>
                        </div>


                        <div className="userFollowersAndFollowing">



                            {
                                userFollowers && searchUserFollowerList.map((i) => {

                                    return <div className="userFollowerTab" key={i._id}  >
                                        <div className="followerProfileIcon">
                                            <img src={`image/${i.profilePicture}`} alt="FollowerProfileIcon" />
                                        </div>

                                        <div className="followerUsername">
                                            <Link to={"/userprofile"} onClick={() => { setUserProfileId(i._id); setReFreshData((pre) => !pre); }}>{i.name}</Link>
                                        </div>


                                    </div>;

                                })
                            }


                            {

                                userFollowing && searchUserFollowingList.map((i) => {

                                    return <div className="userFollowerTab" key={i._id} >
                                        <div className="followerProfileIcon">
                                            <img src={`image/${i.profilePicture}`} alt="FollowerProfileIcon" />
                                        </div>

                                        <div className="followerUsername">
                                            <Link to={"/userprofile"} onClick={() => { setUserProfileId(i._id); setReFreshData((pre) => !pre); }}>{i.name}</Link>
                                        </div>

                                    </div>;

                                })


                            }



                        </div>
                    </div>

            }
        </div >
    );
};

export default FollowersList;