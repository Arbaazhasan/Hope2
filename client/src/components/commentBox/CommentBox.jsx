import React, { useContext, useState } from 'react';
import "./commentBox.css";
import { SlOptionsVertical } from 'react-icons/sl';
import { IoSendSharp } from 'react-icons/io5';
import axios from 'axios';
import { server } from "../../App";
import toast from 'react-hot-toast';
import { Context } from '../..';


const CommentBox = ({ id, userName, postComment, commentUserPhoto }) => {


    const { profilePhoto, setRefreshData } = useContext(Context);


    // Posting A Comment to the Backend Server 

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(userComment);

        axios.put(`${server}/post/comment/${id}`,
            { userComment: userComment }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true

        }).then((res) => {
            setRefreshData((pre) => !pre);
            setUserComment('');

        }).catch((error) => {
            // toast.error(error.data.message);
            console.log(error);


        });

    };

    const [userComment, setUserComment] = useState('');
    return (
        <div className="commentBox">
            <div className="comments">
                <div className="allComments">

                    {
                        postComment?.map((i, index) => {
                            return <div key={index} className="comment" >
                                <div>
                                    <div>
                                        {
                                            commentUserPhoto[index] ? <img src={`/image/${commentUserPhoto[index]}`} alt="" /> : <img src={`/image/${profilePhoto}`} alt="" />
                                        }
                                    </div>
                                    <span>{userName}</span>
                                </div>
                                <div>
                                    <p>{i}</p>
                                    {/* <span><SlOptionsVertical /></span> */}
                                </div>
                            </div>;
                        })
                    }



                </div>
            </div>
            <div className="addComment">
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Enter the comment' onChange={(e) => setUserComment(e.target.value)} value={userComment} />
                    <button><IoSendSharp /></button>
                </form>
            </div>
        </div>
    );
};

export default CommentBox;