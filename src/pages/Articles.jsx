import React, { useContext, useEffect, useState } from 'react';
import { getArticles, setFavoriteArticle, unsetFavoriteArticle } from '../service/articles';
import { ThemeContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../service/user';
import BootstrapModal from '../component/BootstrapModal';

const Articles = () => {
    
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLogin } = useContext(ThemeContext);
    const nav = useNavigate();

    useEffect(() => {
        getArticles().then(data => {
            setArticles(data.articles);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getCurrentUser().then((res) => {
            console.log(res);
        });
    }, []);

    function goToThisArticle(slug) {
        return nav('/articles/' + slug);
    }

    return (
        
        <div className='border rounded-top-4 shadow-sm p-3 bg-white' 
             style={{ width: '615px', margin: '20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
            <div className='articles' style={{ width: '590px' }}> 
                <div className='row d-flex justify-content-center align-items-center mb-4'>
                    {isLogin ? (
                        <div className='col-7 d-flex justify-content-center align-items-center first-title p-3 rounded' 
                             style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}>
                            <img src='/src/assets/images/logo.PNG' style={{ width: '70px' }} />
                            <input className='border-0' type="text" placeholder="What's new?" />
                            <div className='col-12 text-end mt-2'>
                            <BootstrapModal></BootstrapModal>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center'>
                            <p><Link to={'/login'}>Login</Link> to share your world</p>
                            <img src="/src/assets/images/world.gif" style={{ width: '80px' }} alt="" />
                        </div>
                    )}
                </div>
                <hr/>

                {loading ? <div className="text-center">Loading...</div> : null}

                {articles.map(article => (
                    <div className='article_overview p-3 rounded mb-3 shadow-sm' 
                         onClick={() => goToThisArticle(article.slug)} 
                         style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfdfd'}>
                        <div className='row align-items-center'>
                            <div className='col-auto'>
                                <img src={article.author.image} alt="" 
                                     className='rounded-circle' style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                            </div>
                            <div className='col-auto'>
                                <b>{article.author.username}</b>
                                <p className='text-muted' style={{ fontSize: '12px' }}>20h</p>
                            </div>
                            <div className='col ms-auto d-flex justify-content-end'>
                                <button className='btn btn-light btn-sm p-1'><i className="bi bi-three-dots"></i></button>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h6 className='fw-bold'>{article.title}</h6>
                            <p className='text-muted'>{article.description}</p>
                        </div>
                        <div className='d-flex gap-2 mt-2'>
                            <button className='btn btn-outline-danger btn-sm'><i className="bi bi-heart"></i> {article.favoritesCount}</button>
                            <button className='btn btn-outline-secondary btn-sm'><i className="bi bi-chat"></i></button>
                            <button className='btn btn-outline-primary btn-sm'><i className="bi bi-arrow-repeat"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;
