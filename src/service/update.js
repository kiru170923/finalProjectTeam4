import axios from 'axios';
 const userApi = 'https://node-express-conduit.appspot.com/api/user'
export const updateProfileInformation = async (information)=>{
    try{
      const res = await axios.put(userApi, {user: information},  {
        headers: {
          'Authorization': 'Token '+localStorage.getItem('token')
        }
      });
      return res.data;
    }
    catch(error){
      console.log('error')
      return null;
    }
  } 
  export const updateProfileInformation2 = async (information, token)=>{
    try{
      const res = await axios.put(userApi, information,  {
        headers: {
          'Authorization': 'Token '+ token
        }
      });
      return res.data;
    }
    catch(error){
      console.log('error')
      return null;
    }
  } 