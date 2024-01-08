import { Profiler, useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register.jsx';
import Profile from "./pages/Profile/Profile.jsx";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { Context } from '.';
import axios from 'axios';
import Header from './components/Header/Header';
import UpdateUserInfo from './pages/UpdateUserInfo/UpdateUserInfo';
import Loading from './components/Loading/Loading';
import UserProfile from './pages/UserProfile/UserProfile.jsx';

export const server = "http://localhost:4000/api/v1";


function App() {

  const { user, setUser, isAuthonticated, setIsAuthonticated, refreshData, loading } = useContext(Context);

  useEffect(() => {

    axios.get(`${server}/user/me`, {
      withCredentials: true
    }).then((res) => {
      setIsAuthonticated(true);
      setUser(res.data.user);
    }).catch(() => {
      setIsAuthonticated(false);
      setUser({});

    });



  }, [refreshData]);


  

  return (

    <Router >
      {isAuthonticated && <Header />}
      {loading && <Loading />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/updateUserInfo' element={<UpdateUserInfo />} />
        <Route path='/userprofile' element={<UserProfile />} />
      </Routes>

      <Toaster />

    </Router>

  );
}

export default App;
