import React, { useContext, useState } from 'react';
import "./login.css";
import axios from 'axios';
import { server } from '../../App';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Context } from '../..';
import Home from '../Home/Home';



const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { isAuthonticated, setIsAuthonticated, refreshData, setRefreshData, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {

            const { data } = await axios.post(`${server}/user/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            setIsAuthonticated(true);
            setLoading(false);
            toast.success(data.message);

        } catch (error) {
            setIsAuthonticated(false);
            toast.error(error.response.data.message);

        }
    };

    if (isAuthonticated) return <Navigate to={"/"} />;

    return (
        <>
            {isAuthonticated ? <Navigate to={"/"} /> :
                <div className='loginPage'>
                    <div className="loginWinodw">
                        <div className="loginleft">
                            <img src="loginImg.png" alt="" />
                        </div>
                        <div className="loginRight">
                            <h1>LogIn</h1>
                            <form onSubmit={submitHandler}>
                                <input type="text" placeholder='Email' name='email' onChange={(e) => setEmail(e.target.value)} />

                                <input type="text" placeholder='Password' name="password" onChange={(e) => setPassword(e.target.value)} />

                                {/* <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "small", alignSelf: "flex-end", marginTop: "10px" }}>* Confirm password is not same</span> */}
                                <button >Login</button>
                            </form>
                            <Link to={'/register'}>SignUp</Link>
                        </div>
                    </div>
                </div >
            }

        </>
    );
};

export default Login;