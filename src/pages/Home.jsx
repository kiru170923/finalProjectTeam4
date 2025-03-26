import React, { useEffect, useState } from 'react';
import {getTags} from '../service/tags'
import {getArticles} from '../service/articles'


const Home = () => {

    const [tags,setTags] = useState([]);
    useEffect(()=>{

        getTags().then(res=>
            setTags(res.tags))

        getArticles().then(article=>
            console.log(article))

    }, [])



    return (
        <div>
            {console.log(tags)}
        </div>
    );
};

export default Home;