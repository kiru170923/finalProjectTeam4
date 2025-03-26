import axios from 'axios';

export const getArticles = async ()=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles'
    const res = await axios.get(userApi);
    return res.data;
  }
  catch(error){
    console.log('error')
    return null;
  }

} 



