import React, { useState } from 'react';
import {getArticlesFromUsersYouFollowed} from '../service/articles'

const ArticlesFollowed = () => {

    const [followerArticles, setFollowerArticles] = useState();
    
    function getFollowerArticles(){
        getArticlesFromUsersYouFollowed().then(res =>{
            setFollowerArticles(res.articles)
            console.log(res.articles)
        })
    }

    return (

        <div>
          
        </div>
    );
};

export default ArticlesFollowed;