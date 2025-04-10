import React, { useContext, useEffect, useState } from 'react';
import {setUser} from '../service/user';
import toast from 'react-hot-toast';
import {setLogin} from '../service/user'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import LoginByGoogle from './LoginByGoogle';
import LoadingOverlay from '../component/LoadingOverlay';

const Login = () => {
    const nav = useNavigate();
    const {setIsLogin} = useContext(ThemeContext);
    const {isLogin} = useContext(ThemeContext);
    
    const [currentAccountInfo, setCurrentAccountInfo] = useState({
        user: {
            email: '',
            password: ''
        }
    });

    useEffect(()=>{
       if(isLogin){
        
        setLogin(currentAccountInfo).then((res)=>{
            localStorage.setItem('token', res.user.token);
            console.log(res.errors)
            // setCurrentUser(res.user);
            localStorage.setItem('user', JSON.stringify(res.user));
            toast.success("Login Successfull.")
            nav('/home'); 
            
        }).catch(errors=>{
            setIsLogin(false)
            toast.error("Invalid Email or Password.")
           
        })
        
       }
    }, [isLogin]);

    
    //get ussrer information from inpt
    function getUserInformation(event){
        setCurrentAccountInfo((pre)=> (
            {
                user: {...pre.user, [event.target.name]: event.target.value}
            }
        ))
    }
    return (
        
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            {/* <LoginByGoogle/> */}
        <div className="d-flex flex-column align-items-center" style={{ marginTop: '-30vh' }}>
        <h2>Login</h2>
            <input
                type="text"
                onChange={(event) => getUserInformation(event)}
                className="form-control mb-3"
                name="email"
                placeholder="Enter Email..."
                style={{ width: '500px', padding: '8px', fontSize: '14px' }}
            />
            <input
                type="password"
                onChange={(event) => getUserInformation(event)}
                className="form-control mb-3"
                name="password"
                placeholder="Enter Password..."
                style={{ width: '500px', padding: '8px', fontSize: '14px' }}
            />
             <LoadingOverlay/>
            <div className="d-flex gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setIsLogin(true);
                    }}
                    className="btn btn-dark"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => nav('/signup')}
                    className="btn btn-dark"
                >
                    Sign Up
                </button>
            </div>
        </div>
    </div>
    );
};


export default Login;