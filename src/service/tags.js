import axios from 'axios';

export const getTags = async ()=>{

    const userApi = 'https://node-express-conduit.appspot.com/api/tags'

    const res = await axios.get(userApi);
    return res.data;

} 