import axios from 'axios';

export const getArticles = async ()=>{

    const userApi = 'https://node-express-conduit.appspot.com/api/articles'

    const res = await axios.get(userApi);
    return res.data;

} 