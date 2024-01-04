import React, { useContext, useState } from 'react';
import './header.css';
import { AiOutlineSearch } from "react-icons/ai";
import AaccountSettings from '../AccountSettings/AaccountSettings';
import axios from 'axios';
import { server } from "../../App";
import { Context } from '../..';
import { toast } from 'react-hot-toast';


const Header = () => {
  const [logoutBtn, setLogoutBtn] = useState();
  const { isAuthonticated, setIsAuthonticated, profilePhoto } = useContext(Context);

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


  return (
    <div className='header'>
      <main>
        <div className="headerLogo"><span>Hope</span></div>
        <div className="center">
          <form action="">
            <AiOutlineSearch size={25} />
            <input type="text" placeholder='Search for Creators, Inspiration and projects ' />
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