import axios from 'axios';


const API_URL = 'https://node-express-conduit.appspot.com/api';
export const setUser = async (userData) => {
    try {
        const res = await axios.post(API_URL+ '/users', userData, {
        });

        return res.data;
    } catch (error) {
        if (error.response) {
          
            return { errors: error.response.data.errors }; 
        }
     
    }
};


export const setLogin = async(userData) =>{
    try{
        const res = await axios.post(API_URL + '/users/login', userData)
        return res.data;
    }
    catch(error){
        if(error.response){
            return {errors: error.response.data.errors};
        }

    }
}



export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(API_URL + '/user', {
      headers: {
        'Authorization': 'Token ' + token
      }
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return { errors: error.response.data.errors };
    }
    console.log(error.message);
  }
}
