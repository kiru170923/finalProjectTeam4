

import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, Timestamp} from 'firebase/firestore'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { auth, db } from '../config/firebaseConfig'
import { useContext, useEffect, useState } from 'react'
import { setLogin, setUser } from '../service/user';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateProfileInformation2 } from '../service/update';

function LoginByGoogle() {
  const nav = useNavigate();
  const [user, setUserr] = useState([]);
  const [userData, setUserData] = useState();
      const { setIsLogin } = useContext(ThemeContext);
  const [image, setImage] = useState('');

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
  // function normalizeName(name) {
  //   if (!name || typeof name !== "string") return "";
  
  //   return name
  //     .normalize("NFD") // Tách chữ và dấu
  //     .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
  //     .replace(/[^a-zA-Z0-9]/g, "") // Giữ lại chỉ chữ và số
  //     .toLowerCase(); // Viết thường
  // }
  

  // console.log(normalizeName('Kiều Đình Đoàn 2134'))
  const handleGoogleLogin = async ()=> {
     const provider = new GoogleAuthProvider();
     try {
      const result = await signInWithPopup(auth, provider);
      setImage(result.user.photoURL)
      console.log(result.user.photoURL)

    await setUser({
        user: {
          username:'018'+ result.user.uid,
          email:'018'+  result.user.email ,
          password: 'at'+ result.user.uid
        }
      }).then(res => console.log(res))

     setUserData(
          {
            user: {
              email: '018'+ result.user.email ,
              password: 'at'+  result.user.uid 
            }
          }
        )

     } catch (error) {
      console.log(error.message);
      
     }
  }

  console.log(userData)

  useEffect(()=>{
    if(userData && image){
      setLogin(userData).then(res =>{
        if(res.user){
          console.log(res)
           nav('/home');
           localStorage.setItem('token', res.user.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            toast.success("Login Successful!");

            updateProfileInformation2(
              {
                user: {
                  image: image
                }
              }, res.user.token
            ).then(res2 =>{
              localStorage.setItem('user', JSON.stringify(res2.user));
            })
                          
        }
      })
      
    }
  },[userData, image])

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