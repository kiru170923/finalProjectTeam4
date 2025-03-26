import React, { useEffect, useState } from 'react';
import {setUser} from '../service/user';
import toast from 'react-hot-toast';
import {setLogin} from '../service/user'
const Login = () => {


    const [currentAccountInfo, setCurrentAccountInfo] = useState({
        user: {
            email: '',
            password: ''
        }
    });
    const [login,setCurrentLogin] = useState(false);


    useEffect(()=>{
       if(login){
        setLogin(currentAccountInfo).then((res)=>{
            console.log(res);
        })
        setCurrentLogin(false);
       }
       
    }, [login]);
    
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
            <input type='text' onChange={()=>getUserInformation(event)} className='form-control mt-3' name='password' placeholder='Enter Password...'></input>
            <div><button type='button' onClick={()=>setCurrentLogin(true)}>Login</button></div>
        </div>
    </div>
    );
};

export default Login;