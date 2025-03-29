import axios from 'axios';

export const getArticles = async ()=>{

  try{
    const userApi = 'https://node-express-conduit.appspot.com/api/articles/?page=1'
    const res = await axios.get(userApi);
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
    const res = await axios.get(userApi);
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










