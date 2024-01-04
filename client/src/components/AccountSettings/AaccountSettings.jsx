import React from 'react';
import "./accountSettings.css";

const AaccountSettings = () => {
    return (
        <div className='AaccountSettings'>
            <div className="ChangePassword">
                <div className="ChangePasswordWidnowClose">
                    <label htmlFor="">X</label>
                </div>
                <div className="ChangePasswordHeading">
                    <h1>Settings</h1>
                </div>
                <form action="">
                    <h3>Change Password</h3>
                    <input type="text" placeholder='Enter the old password ' />
                    <input type="text" placeholder='Enter the new password ' />
                    <input type="text" placeholder='Enter re-enter the new password ' />
                    <button>Change</button>

                </form>
            </div>
        </div>
    );
};

export default AaccountSettings;