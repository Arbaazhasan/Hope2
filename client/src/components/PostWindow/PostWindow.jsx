import React, { useContext, useEffect, useState } from 'react';
import "./postWindow.css";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi';
import { SlControlStart, SlOptionsVertical } from 'react-icons/sl';
import axios from 'axios';
import { server } from '../../App';
import toast from 'react-hot-toast';
import { Context } from '../..';
import CommentBox from "../commentBox/CommentBox";
import { BsBookmarkFill } from 'react-icons/bs';



const PostWindow = ({ id, userName, profilePhoto, userId, desc, img, likes }) => {

    // console.log(likes);
    const { postAccount, refreshData, setRefreshData, } = useContext(Context);

    // console.log(id, userName, userId, desc, likes);

    const [postOption, setPostOption] = useState(false);
    const [isCommentClick, setIsCommentClick] = useState(false);
    const [isUserliked, setUserIsliked] = useState(false);
    const [savePostButton, setSavePostButton] = useState(false);
    const [isPostSaved, setIsPostSaved] = useState(false);

    const [postComments, setPostComments] = useState([]);
    const [commentUserPhotos, setCommentUserPhotos] = useState([]);
    const [commentUsername, setCommentUsername] = useState([]);

    const [checkUrl, setCheckUrl] = useState();





    const likePost = async () => {
        try {
            const postLikeBtn = await axios.put(`${server}/post/${id}/like`, {

            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
            // console.log(postLikeBtn);
            setRefreshData((pre) => !pre);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async () => {

        try {

            const { data } = await axios.delete(`${server}/post/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            toast.success(data.message);
            setRefreshData((pre) => !pre);

        } catch (error) {
            toast.error(error.message);
        }

    };

    const saveUserPost = async () => {
        // axios.put(`${server}/post/savepost/${id}`, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     withCredentials: true,

        // }).then((res) => {
        //     console.log(res);
        // }).catch((error) => {
        //     console.log(error);
        // });

        const { data } = await axios.put(`${server}/post/savepost/${id}`, {}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,

        });
        console.log(data);
        setSavePostButton(true);
        setRefreshData((pre) => !pre);
    };

    useEffect(() => {


        // Check User isLike Post or Not

        try {
            axios.get(`${server}/post/isliked/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }).then((res) => {
                setUserIsliked(res.data.isliked);
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {
            console.log(error);
        }



        // Fetchting Posts COmments 

        axios.get(`${server}/post/getcomments/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        }).then((res) => {

            if (res.data.comments) {
                // Extract comments and user Details from the response
                const comments = res.data.comments.map((i) => i.comment);
                const userPhotos = res.data.comments.map((i) => i.commentUserPriofilePicture);
                const commentUsername = res.data.comments.map((i) => i.commentUsername);


                // Update state variables with the arrays of comments and user photos

                setCommentUsername(commentUsername);
                setPostComments(comments);
                setCommentUserPhotos(userPhotos);

            }


        }).catch((error) => {
            console.log(error);
        });



        // Checking user is Post saved or not


        axios.get(`${server}/post/issaved/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
            setIsPostSaved(res.data.issaved);

            // console.log(res);
        }).catch((error) => {
            console.log(error);
        });


        const path = window.location.pathname;

        setCheckUrl(path);


    }, [refreshData]);


    return (

        <div className="postWindow">
            <div className="postUsername">
                <div className='postWindwoProfileiPhoto'>
                    <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="ProfileIcon" />

                </div>
                <div>
                    <a href="#home">{userName}</a>
                    <p>Dubai, 15 Minutes Ago</p>
                </div>

                {
                    checkUrl === "/profile" ?

                        postAccount && <p ><SlOptionsVertical onClick={((e) => setPostOption((pre) => !pre))} />

                            {
                                postOption && <div>
                                    <span>Edit</span>
                                    <span onClick={deletePost}>Delete</span>
                                </div>
                            }
                        </p> : ""

                }
            </div>
            <div className="postContent">
                <div>
                    <p>{desc}</p>
                </div>
                <div>
                    {img && <img src={`image/${img}`} alt="PostContent" />}

                </div>
            </div>
            {
                isCommentClick && <div className="commentBoxWindow">
                    <CommentBox id={id} commentUsername={commentUsername} postComment={postComments} commentUserPhoto={commentUserPhotos} />

                </div>
            }
            <div className="postLikeCommentShare">
                {
                    isUserliked ? <button onClick={likePost}><AiFillHeart color='red' /></button> : <button onClick={likePost}><AiOutlineHeart /></button>
                }
                <button onClick={(() => setIsCommentClick((pre) => !pre))}><FaRegCommentDots /></button>
                <button onClick={saveUserPost}>{isPostSaved ? <BiSolidBookmark color='red' /> : <BiBookmark />}</button>
            </div>
            <p>{likes.length} Likes</p>
        </div>

    );
};

export default PostWindow;