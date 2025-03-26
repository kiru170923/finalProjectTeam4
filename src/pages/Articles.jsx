import React, { useEffect, useState } from 'react';
import {getArticles} from '../service/articles';

const Articles = () => {
    
    const [articles,setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        getArticles().then(data=>{
            setArticles(data.articles)
            setLoading(false);
        });
    },[])

    return (
        <div className='border rounded-top-4' style={{width:'615px', margin:'0 auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className='articles pt-3' style={{width:'590px'}}> 
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-6 d-flex justify-content-start align-items-center first-title'>
                        <img src='/src/assets/images/logo.PNG' style={{width:'70px'}}></img>
                        <input className='border-0' type="text" placeholder="What's new?" />
                    </div>
                    <div className='col-6 text-end'><button>Post</button></div>

                    {loading? <div>loading</div>:<div></div>}
                </div>
            {articles.map(article =>{
                return <>
                <div className='row gap-2' style={{width:'100%'}} >
                    <div className='col-1'>
                     <div><img src='/src/assets/images/logo.PNG' alt="" style={{width:'50px'}}/></div>
                    </div>
                    <div className='col-2'>
                        <b>{article.author.username}</b>
                        <p></p>
                    </div>
                </div>
                
                <hr></hr>
                </>
            })}
        </div>
        </div>
    );
};

export default Articles;