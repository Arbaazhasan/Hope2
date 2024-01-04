import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import "./likedPosts.css";
import axios from 'axios';
import { server } from '../../App';
import { Context } from '../..';
import PostWindow from '../PostWindow/PostWindow';

const LikedPosts = ({ WindowTitle }) => {

    // const { savedPostWindow, setSavedPostWindow } = useContext(Context);
    const [allSavedPosts, setAllSavedPosts] = useState([]);

    useEffect(() => {
        axios.get(`${server}/post/getsavedposts`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data.savedPosts);
            setAllSavedPosts(res.data.savedPosts);
        }).catch((error) => {
            console.log(error);
        });
    }, []);



    const getSavedPosts = async () => {

        // Fetching User Saved Posts 

    };



    getSavedPosts();

    return (
        <div>
            <div className="likedPosts">
                <div className="likedPostsHeading">
                    <p><AiOutlineLike size={40} /> {WindowTitle}</p>
                </div>
                <div className="allLikedPosts">


                    {/* {
                        allSavedPosts.map((i) => <div className="likedPost" >
                            <div className="LikedPostUsername">
                                <div>
                                    <img src="img2.png" alt="UserProfile" />
                                </div>
                                <a href="">{i.username}</a>
                            </div>
                            <div>
                                <p>{i.desc}</p>
                            </div>
                            <div className="likedPostContent">
                                <img src={`image/${i.img}`} alt="" />
                            </div>
                        </div>)
                    } */}


                    <div className="likedPost" >
                        <div className="LikedPostUsername">
                            <div>
                                <img src="img2.png" alt="UserProfile" />
                            </div>
                            <a href="">Lana Rose</a>
                        </div>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero laboriosam harum, architecto repellat possimus, itaque excepturi laudantium dicta, officia dignissimos laborum placeat rerum tenetur impedit reprehenderit modi illum. Expedita corporis nisi deleniti repudiandae, minus sapiente in vitae placeat? Ipsam, consectetur! Voluptatum doloribus, voluptatibus molestiae aliquid iusto numquam, rem, similique asperiores excepturi labore recusandae impedit eligendi minus pariatur! Harum ad nemo magnam ipsum minus est quos voluptatem quas tempore suscipit laboriosam aut neque ex non, commodi vitae nesciunt hic tenetur animi. Culpa inventore odit sint voluptatum itaque, molestias voluptates soluta tempora quasi obcaecati vero quaerat alias totam accusantium nulla natus? Minus inventore eum dicta adipisci provident distinctio voluptatem, nulla officia modi consectetur obcaecati fuga, repudiandae deserunt. Odit totam sequi, iure itaque corrupti fuga!</div>
                        <div className="likedPostContent">
                            <img src="img1.png" alt="" />
                        </div>
                    </div>





                    {/* <div className="likedPost" >
                        <div className="LikedPostUsername">
                            <div>
                                <img src="img2.png" alt="UserProfile" />
                            </div>
                            <a href="">Lana Rose</a>
                        </div>
                        <div>lOREM122</div>
                        <div className="likedPostContent">
                            <img src="img1.png" alt="" />
                        </div>
                    </div>





                    <div className="likedPost" >
                        <div className="LikedPostUsername">
                            <div>
                                <img src="img2.png" alt="UserProfile" />
                            </div>
                            <a href="">Lana Rose</a>
                        </div>
                        <div>lOREM122</div>
                        <div className="likedPostContent">
                            <img src="img1.png" alt="" />
                        </div>
                    </div>





                    <div className="likedPost" >
                        <div className="LikedPostUsername">
                            <div>
                                <img src="img2.png" alt="UserProfile" />
                            </div>
                            <a href="">Lana Rose</a>
                        </div>
                        <div>lOREM122</div>
                        <div className="likedPostContent">
                            <img src="img1.png" alt="" />
                        </div>
                    </div> */}





                </div>
            </div>
        </div>
    );
};

export default LikedPosts;