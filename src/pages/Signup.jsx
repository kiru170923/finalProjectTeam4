import React, { useContext, useEffect, useState } from 'react';
import {setUser} from '../service/user';
import toast from 'react-hot-toast';


const Signup = () => {

    const [accountInfor, setAccountInfo] = useState({
      user:{
     username:'',
        email:'',
        password:''
      }
    });
  
    const [signup,setSignup] = useState(false);


    // get new user ìnomation from input
    function setAccountInformation(event){
        setAccountInfo((prev) => ({
            user: { ...prev.user, [event.target.name]: event.target.value }
        }));
        
    }

    useEffect(() => {
        if (signup) {
            setUser(accountInfor).then((user) => {
                if (user.user) {
                    setTimeout(()=>{
                        toast.success("Sign Up Successfully.")
                    }, 1000)
                    
                } 
                else if(user.errors){
                    user.errors.email === "is already taken." ? toast.error("This Email already taken."): toast.error("please input email information")
                    user.errors.username === "is already taken." ? toast.error("This Username already taken."): toast.error("please input username information")
                    
                }
                setSignup(false);
            });
        }
    }, [signup]);
    
    

    return (
        <div>
            <div>
                <input required onChange={setAccountInformation}  type='text' className='form-control mt-3' name='username' placeholder='Enter UserName...'></input>
                <input required onChange={setAccountInformation}  type='text' className='form-control mt-3' name='email' placeholder='Enter UserName...'></input>
                <input required onChange={setAccountInformation}  type='password' className='form-control mt-3' name='password' placeholder='Enter Password...'></input>
                <div><button type='button' className='mt-3' onClick={()=> setSignup(true)}>Sign up</button></div>
            </div>
        </div>
    );
};

export default Signup;