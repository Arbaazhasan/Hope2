import React, { useContext, useState } from 'react';
import "./updateUserInfo.css";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../App';
import toast from 'react-hot-toast';
import { Context } from '../..';


const UpdateUserInfo = () => {

    const { isAuthonticated, refreshData, setRefreshData } = useContext(Context);

    const [updateName, setUpdateName] = useState();
    const [updateRelationship, setUpdateRelationship] = useState();
    const [updateLives, setUpdateLives] = useState();
    const [updateWork, setUpdateWork] = useState();
    const [updateBio, setUpdateBio] = useState();
    const [isProfileUpdate, setIsProfileUpdate] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    // const [profilePicture2, setProfilePicture2] = useState();
    const [coverPhoto, setCoverPhoto] = useState();

    // console.log(profilePicture);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            // console.log(updateName, updateRelationship, updateLives,
            //     updateWork,
            //     updateBio);

            const formData = new FormData();
            updateName && formData.append("name", updateName);
            updateRelationship && formData.append("status", updateRelationship);
            updateLives && formData.append("lives", updateLives);
            updateBio && formData.append("bio", updateBio);
            updateWork && formData.append("work", updateWork);
            profilePicture && formData.append("profilePicture", profilePicture);
            coverPhoto && formData.append("coverPhoto", coverPhoto);

            const { data } = await axios.put(`${server}/user/updateInfo`,
                formData
                ,
                {
                    headers: {
                        "Content-type": "multipart/form-data"

                    },
                    withCredentials: true,

                });

            setIsProfileUpdate(true);
            toast.success(data.message);
            setRefreshData((pre) => !pre);

        } catch (error) {
            setIsProfileUpdate(false);

            toast.error(error.message);

        }
    };

    if (!isAuthonticated) return <Navigate to={'/login'} />;
    if (isProfileUpdate) return <Navigate to={'/'} />;

    return (

        <div className="UpdateInfoWindow">
            <div className="UpdateInfo">
                <div className="CloseUpdateInfoWindow">
                    <Link to={'/profile'}>X</Link>
                </div>
                <div className='UpdateinfoHeading'>
                    <h3>Your Info</h3>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="userUpdateInput">
                        <input type="text" placeholder='Name' onChange={((e) => setUpdateName(e.target.value))} />
                        <input type="text" placeholder='Relationship Status ' onChange={((e) => setUpdateRelationship(e.target.value))} />
                        <input type="text" placeholder='Lives in ' onChange={((e) => setUpdateLives(e.target.value))} />
                        <input type="text" placeholder='Works at' onChange={((e) => setUpdateWork(e.target.value))} />
                        <input type="text" placeholder='Bio' style={{ width: "93%" }} onChange={((e) => setUpdateBio(e.target.value))} />

                    </div>
                    <div className="profileAndCoverPicture">
                        <div>
                            <label htmlFor="">Profile Picture</label>
                            <input type="file" placeholder="Profile Picture" name="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
                        </div>
                        <div>
                            {/* <label htmlFor="">Cover Photo</label> */}

                            {/* <input type="file" placeholder="Cover Picture" onChange={(e) => setCoverPhoto(e.target.files[0])} /> */}
                            {/* <input type="file" placeholder="Profile Picture" name="coverPhoto" onChange={(e) => setCoverPhoto(e.target.files[0])} /> */}


                        </div>
                    </div>
                    <div className="UpdateInfoBtn">
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateUserInfo;