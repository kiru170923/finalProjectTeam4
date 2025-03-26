import React, { useEffect, useState } from 'react';
import {getArticles} from '../service/articles';

const Articles = () => {
    
    const [articles,setArticles] = useState([]);
    

    useEffect(()=>{

        getArticles().then(data=>{
            setArticles(data.articles)
        });
    },[])

    return (
        <div>
            {articles.map(article =>{
                return <>
                <div key={article.slug}>{article.title}</div>
                <div><img src={article.author.image}></img></div>
                </>
            })}
        </div>
    );
};

export default Articles;