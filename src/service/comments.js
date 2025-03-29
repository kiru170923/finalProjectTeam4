import axios from 'axios';

const API_URL = 'https://node-express-conduit.appspot.com/api';

export const postNewComment = async(slug, commentData) =>{
    try{
        const res = await axios.post(API_URL + '/articles/'+ slug + '/comments', {
            comment:{
                body: commentData
            }
        }, {
            headers: {
                'Authorization': 'Token '+ localStorage.getItem('token')
            }
            
        })
        return res.data;
    }
    catch(error){
        if(error.response){
            return {errors: error.response.data.errors};
        }

    }
}

export const deleteCurrentComment = async(slug, id) =>{
    try{
        const res = await axios.delete(API_URL + '/articles/'+ slug + '/comments/' + id, {
            headers: {
                'Authorization': 'Token '+ localStorage.getItem('token')
            }
            
        })
        return res.data;
    }
    catch(error){
        if(error.response){
            return {errors: error.response.data.errors};
        }

    }
}



