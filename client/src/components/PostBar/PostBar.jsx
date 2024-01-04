import React, { useContext, useState } from 'react';
import "./postBar.css";
import { BiImageAdd } from "react-icons/bi";
import axios from 'axios';
import { server } from "../../App";
import toast from 'react-hot-toast';
import { Context } from '../..';


const PostBar = () => {
    const { profilePhoto, refreshData, setRefreshData, } = useContext(Context);
    const [postData, setPostData] = useState('');
    const [postFile, setPostFile] = useState(null);


    const submitHandler = async (e) => {
        e.preventDefault();

        if (postFile || postData) {
            const formData = new FormData();
            formData.append('desc', postData);
            formData.append('image', postFile);
            try {

                const { data } = await axios.post(`${server}/post/create`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true
                    }
                );
                setPostData("");
                setPostFile(null);
                toast.success(data.message);
                setRefreshData((pre) => !pre);

            } catch (error) {
                toast.error(error.response.message);
            }
        }

    };

    return (
        <div className='postBar'>
            <div>
                <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="profileIcon" />

            </div>

            <form onSubmit={submitHandler} encType='multipart/form-data'>
                <input type="text" placeholder="Whats's in your mind, Diana Ayi ?" name="profilePostBar" onChange={(e) => setPostData(e.target.value)} value={postData} />
                <input type="file" id='uploadBtn' name="profileImage" hidden onChange={(e) => { setPostFile(e.target.files[0]); }} />
                <label htmlFor="uploadBtn"><BiImageAdd size={25} /></label>
                <button type='submit' >Post</button>
            </form>

        </div>
    );
};

export default PostBar;