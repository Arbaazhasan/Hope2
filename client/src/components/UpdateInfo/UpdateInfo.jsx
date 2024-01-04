import React from 'react';
import "./updateInfo.css";

const UpdateInfo = () => {
    return (
        <div className="UpdateInfoWindow">
            <div className="UpdateInfo">
                <div className="CloseUpdateInfoWindow">
                    <a href="#">X</a>
                </div>
                <div className='UpdateinfoHeading'>
                    <h3>Your Info</h3>
                </div>
                <form action="">
                    <div className="userUpdateInput">
                        <input type="text" placeholder='First Name' />
                        <input type="text" placeholder='Last Name' />
                        <input type="text" placeholder='Relationship Status ' />
                        <input type="text" placeholder='Lives in ' />
                        <input type="text" placeholder='Bio' style={{ width: "93%" }} />

                    </div>
                    <div className="profileAndCoverPicture">
                        <div>
                            <label htmlFor="">Profile Picture</label>
                            <input type="file" placeholder="Profile Picture" />
                        </div>
                        <div>
                            <label htmlFor="">Profile Picture</label>

                            <input type="file" placeholder="Cover Picture" />
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

export default UpdateInfo;