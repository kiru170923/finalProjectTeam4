import React, { useContext, useEffect, useState } from 'react';
import {setUser} from '../service/user';
import toast from 'react-hot-toast';
import {setLogin} from '../service/user'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
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
            // setCurrentUser(res.user);
            localStorage.setItem('user', JSON.stringify(res.user));
            
            
        })
        nav('/home');
        toast.success("Login Successfull.")
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
        
        <div>
           
        <div>
            <input type='text' onChange={()=>getUserInformation(event)} className='form-control mt-3' name='email' placeholder='Enter Email...'></input>
            <input type='password' onChange={()=>getUserInformation(event)} className='form-control mt-3' name='password' placeholder='Enter Password...'></input>
            <div><button type='button' onClick={()=>{
                setIsLogin(true);
            }}>Login</button></div>
        </div>
    </div>
    );
};


export default Login;