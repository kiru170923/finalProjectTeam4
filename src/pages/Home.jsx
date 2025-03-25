import React, { useEffect, useState } from 'react';
import {getTags} from '../service/tags'
import {getArticles} from '../service/articles'

const Home = () => {
    const [tags,setTags] = useState([]);
    const [articles,setArticles] = useState([]);


    return (
        <div>
            
        </div>
    );
};

export default Home;