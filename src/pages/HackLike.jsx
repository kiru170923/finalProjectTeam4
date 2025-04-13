import axios from 'axios';
import React, { useState } from 'react';
import { setLogin, setUser } from '../service/user';
import {setFavoriteArticle2} from '../service/articles'
const API_URL = 'https://node-express-conduit.appspot.com/api';


const HackLike = () => {
    const [numberLike, setNumberLike] = useState(0);
    const [slug, setSlug] = useState('')
    
    function getRandomNumber() {
        return Math.floor(Math.random() * 1000) + 1;
      }
      
  async function hackLike() {
    const randomNumber = getRandomNumber();
  
    if(numberLike){

        for(let i = 0 ; i < numberLike ; i++){
            const username = `p${randomNumber}kt${i}`;
            const email = `${username}@test.com`
            const password = `passk${i}`
           const signUpUser = await setUser({
            user: {
              username: username,  
              email: email,
              password: password
            }
          })
          
          if(slug){
            console.log(signUpUser.data?.user?.token)
            setFavoriteArticle2(slug, signUpUser.user.token);
            console.log('hack thanh cong')
          }
        }
    }
  }
    
    return (
        <div>
            <label htmlFor="">Number like wanna hack</label>
            <input type='number' onChange={(e) => setNumberLike(e.target.value)}></input>
            <label htmlFor="">article slug</label>
            <input type='text' onChange={(e) => setSlug(e.target.value)}></input>
            <button onClick={hackLike}>hack</button>
            
        </div>
    );
};

export default HackLike;