import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { AiOutlineSearch } from "react-icons/ai";
import AaccountSettings from '../AccountSettings/AaccountSettings';
import axios from 'axios';
import { server } from "../../App";
import { Context } from '../..';
import { toast } from 'react-hot-toast';


const Header = () => {
  const [logoutBtn, setLogoutBtn] = useState();
  const [searchUserName, setSearchUserName] = useState();

  const { isAuthonticated, setIsAuthonticated, profilePhoto, setVal,
    searchUserData, setSearchUserData

  } = useContext(Context);


  // Logout API
  const submitHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`,
        {
          headers: {
            "Content-type": "application/json"
          },
          withCredentials: true,
        }
      );
      setIsAuthonticated(false);
      toast.success(data.message);
    } catch (error) {

      setIsAuthonticated(true);
      toast.error(error.reponse.message);

    }


  };


  // Search A User
  const searchData = (e) => {

    e.preventDefault();


    try {

      axios.get(`${server}/user/getUserProfile/${searchUserName}`, {
        header: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((res) => {
        setSearchUserData(res.data);
        // console.log(searchUserData);
      });

    } catch (error) {

      console.log(error);

    }


  };

  return (
    <div className='header'>
      <main>
        <div className="headerLogo"><span>Hope</span></div>
        <div className="center">
          <form action="" onSubmit={searchData}>
            <AiOutlineSearch size={25} />
            <input onClick={() => setVal("SearchUser")} onChange={(e) => { setSearchUserName(e.target.value); }} type="text" placeholder='Search for Creators, Inspiration and projects ' />
          </form>
        </div>
        <div className="UserProfileIcon">
          <div>
            <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="Profile" onClick={(e) => setLogoutBtn((pre) => !pre)} />
            {
              logoutBtn && <label id='LogoutBtn' onClick={submitHandler}>Log Out</label>
            }
          </div>
        </div>
      </main>

    </div>
  );
};

export default Header;