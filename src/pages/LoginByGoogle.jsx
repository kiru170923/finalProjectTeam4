

import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, Timestamp} from 'firebase/firestore'
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { auth, db } from '../config/firebaseConfig'
import { useEffect, useState } from 'react'

function LoginByGoogle() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState([]);
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('')

  useEffect(()=>{

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubcribe = onSnapshot(q, snapshot => {
      setMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
 
      })))
    })
    return () => unsubcribe();
  }, [])


  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user){
        setUser(user);
      }
      else{
        setUser(null);
      }
    })
  }, [])

  const sendMessage = async ()=>{
    await addDoc(collection(db, "messages"),{
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp : serverTimestamp()
    })
    setNewMessage("")
  }

  const handleGoogleLogin = async ()=> {
    
     const provider = new GoogleAuthProvider();
     try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)

     } catch (error) {
      console.log(error.message);
      
     }
  }

  return (
    <div className=''>
     {user ?<div>Logged in as {user.displayName}
      <input value={newMessage}
      onChange={e => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send message</button>
      <button onClick={()=> auth.signOut()}>Logout</button>
      {messages.map(msg => (
        <div key={msg.id}>
          <img src={msg.data.photoURL} alt="" />
          {msg.data.text}
        </div>
      ))}



      
      </div>: <button onClick={handleGoogleLogin}>login with google</button>
}

    </div>
  ) 
}

export default LoginByGoogle;
