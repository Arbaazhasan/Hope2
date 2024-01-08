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
    const { user, isSearch, userProfileId } = useContext(Context);
    // console.log(userId);

    const [userFollowers, setUserFollowers] = useState(true);
    const [userFollowing, setUserFollowing] = useState(false);

    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollwoingList] = useState([]);

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
        console.log(data);

    };



    useEffect(() => {

        const path = window.location.pathname;
        setCheckUrl(path);


        // Fetching User Follwoers and Following 

        axios.get(`${server}/user/getfollowerslist/${userId}`,
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



    }, [reFreshData]);



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

                                {
                                    checkUrl === "/profile" ? <div className="followBtn" onClick={() => followAndUnfollowUser(i._id)}>
                                        <span>{i.isFollow ? "Unfollow" : "Follow"}</span>
                                    </div> : " "
                                }





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