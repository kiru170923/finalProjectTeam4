import axios from 'axios';

export const getArticles = async (token)=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles'
    const res = await axios.get(userApi, {
      headers: {
        'Authorization': 'Bearer '+ token
      }
    });
    return res.data;
  }
  catch(error){
    console.log('error')
    return null;
  }
} 

export const getAllArticles = async ()=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles/?limit=450'
    const res = await axios.get(userApi);
    return res.data;
  }
  catch(error){
    console.log('error')
    return null;
  }
} 
export const getArticlesAsGuest = async ()=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles'
    const res = await axios.get(userApi
    );
    return res.data;
  }
  catch(error){
    console.log('error')
    return null;
  }
} 

export const getArticlesFromUsersYouFollowed = async (token)=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles/feed?limit='
    const res = await axios.get(userApi, {
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

export const getCurrentArticle = async(slug)=>{
  try{

    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug;
    const res = await axios.get(userApi, {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}
export const getCurrentArticleComment = async(slug)=>{
  try{

    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug + '/comments';
    const res = await axios.get(userApi);
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}
export const setFavoriteArticle = async(slug)=>{
  try{

    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug + '/favorite';
    const res = await axios.post(userApi,{}, 
       {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}



export const unsetFavoriteArticle = async(slug)=>{
  try{

    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug + '/favorite';
    const res = await axios.delete(userApi, 
       {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}

export const createNewArticle = async(article) =>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles';
    const res = await axios.post(userApi, article, {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data; 

  }
  catch(error){
    console.log(error);
  }
}

export const DeleteArticle = async(slug) =>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug;
    const res = await axios.delete(userApi, {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data; 

  }
  catch(error){
    if(error.response){
        return {errors: error.response.data.errors};
    }

}
}

export const updateArticle = async(slug, newArticle) =>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles/' + slug;
    const res = await axios.put(userApi,newArticle, {
      headers: {
        'Authorization': 'Token '+localStorage.getItem('token')
      }
    });
    return res.data; 

  }
  catch(error){
    if(error.response){
        return {errors: error.response.data.errors};
    }

}
}


export const getCurrentFavoriteStatus = async(username)=>{
  try{

    const userApi = 'https://node-express-conduit.appspot.com/api/profiles/' + username;
    const res = await axios.get(userApi, {
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }
    });
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}







