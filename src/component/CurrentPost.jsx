import React, { useEffect, useState } from 'react';
import { getAllArticles, getArticlesByUsername } from '../service/articles';
import { useNavigate } from 'react-router-dom';

const CurrentPost = ({ currentUser }) => {
    const [currentUserArticles, setCurrentUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();


    // lọc post của bản thân từ list all post
    useEffect(() => {

        if(currentUser){
            
        getArticlesByUsername(currentUser.username).then((res)=>{
            setCurrentUserArticles(res.articles)
            setLoading(false);
        })
        }
        // getAllArticles().then(res => {
        //     setCurrentUserArticles(
        //         res.articles.filter(article => article?.author?.username === currentUser?.username)
        //     );
        //     
        // });
    }, [currentUser]);

    return (
        <div className='border rounded-top-4 shadow-sm p-3 pt-0 mt-0 bg-white' 
            style={{ width: '550px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='articles' style={{ width: '550px' }}>
                <hr />
                {loading ? (
                    <div className="text-center">
                        <img style={{ width: '400px' }} src='/images/loading.gif' alt="Loading..." />
                    </div>
                ) : null}
                {(currentUserArticles) && currentUserArticles.length > 0 ? (
                    currentUserArticles.map((article, index) => (
                        <div key={article.slug || index}
                        onClick={()=>nav('/articles/' + article?.slug )}
                            className='article_overview p-3 rounded mb-3 shadow-sm'
                            style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfdfd'}>
                            <div className='row align-items-center'>
                                <div className='col-auto'>
                                    <img style={{ width: '40px', height: '40px', borderRadius: '100%' }}
                                        src={article.author.image} alt={article.author.username} />
                                </div>
                                <div className='col-auto'>
                                    <b>{article.author.username} {article.author.username === JSON.parse(localStorage.getItem('user')).username ? '(Bạn)' : ''}</b>
                                    <p className='text-muted' style={{ fontSize: '12px' }}>{article.createdAt}</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h6 className='fw-bold'>{article.title}</h6>
                                <p className='text-muted'>{article.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                   <div><img src='/images/nothing.png' width={'300px'}></img></div>
                )}
            </div>
        </div>
    );
};

export default CurrentPost;