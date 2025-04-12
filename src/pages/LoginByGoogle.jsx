

import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, Timestamp} from 'firebase/firestore'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { auth, db } from '../config/firebaseConfig'
import { useContext, useEffect, useState } from 'react'
import { setLogin, setUser } from '../service/user';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LoginByGoogle() {
  const nav = useNavigate();
  const [user, setUserr] = useState([]);
  const [userData, setUserData] = useState();
      const { setIsLogin } = useContext(ThemeContext);
  

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user){
        setUserr(user);
      }
      else{
        setUserr(null);
      }
    })
  }, [])


  // function getName(name){
  //   const nameAfterSplit = name.split(' ').join('')
  //   return nameAfterSplit;
  // }
  function normalizeName(name) {
    return name
      .normalize("NFD")                     // Tách dấu ra khỏi ký tự gốc
      .replace(/[\u0300-\u036f]/g, "")     // Xóa các dấu
      .replace(/\s+/g, "")                 // Xóa khoảng trắng
      .toLowerCase();                      // Viết thường
  }
  const handleGoogleLogin = async ()=> {
     const provider = new GoogleAuthProvider();
     try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)

    await setUser({
        user: {
          username: result.user.uid,
          email: result.user.email,
          password: result.user.uid
        }
      })

        setUserData(
          {
            user: {
              email: result.user.email,
              password: result.user.uid
            }
          }
        )
      
     } catch (error) {
      console.log(error.message);
      
     }
  }

  console.log(userData)

  useEffect(()=>{
    if(userData){
      setLogin(userData).then(res =>{
        if(res.user){
          console.log(res)
           nav('/home');
           localStorage.setItem('token', res.user.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            toast.success("Login Successful!");
                          
        }
      })
    }
  },[userData])

  return (
    <div className=''>
     {user ?<div>Logged in as {user.displayName}
      <button onClick={()=> auth.signOut()}>Logout</button>
      </div>: <div onClick={handleGoogleLogin} className='d-flex justify-content-center align-items-center'><div className='login-google' style={{width:"40px", height:'40px', backgroundImage:'url("/images/google.svg")'}} ></div></div>
}

    </div>
  ) 
}

export default LoginByGoogle;




// setLogin(
//   {
//     user: {
//       email: res.email,
//       password: result.user.uid
//     }
//   }


// ).then(res2 =>{
//   console.log('Thanh cong: ' + res2)
// })