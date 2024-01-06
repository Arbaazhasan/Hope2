import React, { useContext } from 'react';
import "./accountSettings.css";
import { Context } from '../..';
import { Link } from 'react-router-dom';



const AaccountSettings = () => {

    const { setVal } = useContext(Context);


    return (
        <div className='AaccountSettings'>
            <div className="ChangePassword">
                <div className="ChangePasswordWidnowClose" onClick={() => setVal("home")}>
                    <label htmlFor="">X</label>
                </div>
                <div className="ChangePasswordHeading">
                    <h1>Settings</h1>
                </div>
                <form action="">
                    <h3>Change Password</h3>
                    <input type="text" placeholder='Enter the old password ' />
                    <input type="text" placeholder='Enter the new password ' />
                    <input type="text" placeholder='Re-enter the new password ' />
                    <button>Change</button>

                </form>
            </div>
        </div>
    );
};

export default AaccountSettings;