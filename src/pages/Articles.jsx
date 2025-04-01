import React, { useContext, useEffect, useState } from 'react';
import { getArticles, setFavoriteArticle, unsetFavoriteArticle } from '../service/articles';
import { ThemeContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../service/user';
import BootstrapModal from '../component/BootstrapModal';
import {DeleteArticle, updateArticle} from '../service/articles';
import toast from 'react-hot-toast';
import SettingsMenu from '../component/SettingMenu';
import UserPreviewProfile from '../component/UserPreviewProfile';
import ArticlesFollowed from './ArticlesFollowed';

const Articles = ({}) => {
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLogin } = useContext(ThemeContext);
    const {setReload, getFormatTime} = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const nav = useNavigate();

    useEffect(() => {
        getArticles().then(data => {
            setArticles(data.articles);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getCurrentUser().then((res) => {
        });
    }, []);

    function goToThisArticle(slug) {

        return nav('/articles/' + slug);
    }

    function DeleteThisArticle(slug, e){
        DeleteArticle(slug).then(res =>{
            if(!res.errors){
                setArticles((pre => pre.filter(article => (article.slug != slug))))
                toast.success("Delete successfully !")
            }
            else{
                toast.error("Delete failed!")
            }
          
        });
        e.stopPropagation();
    }


    return (
        
        <div className='border rounded-top-4 shadow-sm p-3 bg-white' 
             style={{ width: '615px', margin: '20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
            <div className='articles' style={{ width: '590px' }}> 
                <BootstrapModal/>
                <hr/>

                {loading ? <div className="text-center">Loading...</div> : null}

                {articles.map(article => (
                    
                    <div key={article.slug} className='article_overview p-3 rounded mb-3 shadow-sm' 
                         onClick={() => goToThisArticle(article.slug)} 
                         style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfdfd'}>
                        <div className='row align-items-center'>
                            {/* <div className='btn btn-danger' onClick={(e)=>{DeleteThisArticle(article.slug, e)}}>Delete</div>
                            <div className='btn btn-success' onClick={(e)=>{UpdateThisArticle(article.slug, e)}}>Update</div> */}
                            <div className='col-auto '>
                                
                                      <div className='d-flex justify-content-center align-items-start mt-0  rounded-circle' onClick={(e) => e.stopPropagation()}><UserPreviewProfile author = {article.author}/></div>
                            </div>
                            <div className='col-auto'>
                                <b>{article.author.username + (article.author.username === currentUser.username? ' (Bạn)': '')}</b>
                                <p className='text-muted' style={{ fontSize: '12px' }}>{getFormatTime(article.createdAt)}</p>
                            </div>
                            <div className='col ms-auto d-flex justify-content-end align-items-center'>
                          
                            {article.author.username === currentUser.username ? (
      <SettingsMenu  DeleteThisArticle = {DeleteThisArticle} slug = {article.slug} />
) : null}

                                
                            </div>
                           
                        </div>
                        <div className='mt-2'>
                            <h6 className='fw-bold'>{article.title}</h6>
                            <p className='text-muted'>{article.description}</p>
                        </div>
                        {/*  <i className="bi bi-heart-fill text-danger"></i> */}
                        <div className='d-flex gap-2 mt-2'>
                            <button className='btn btn-outline-danger btn-sm'>{article.favorited? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>} {article.favoritesCount}</button>
                            <button className='btn btn-outline-secondary btn-sm'><i className="bi bi-chat"></i></button>
                            <button className='btn btn-outline-primary btn-sm'><i className="bi bi-arrow-repeat"></i></button>
                        </div>
                    </div>
                ))}
            </div>
            <div><ArticlesFollowed/></div>
        </div>
    );
};

export default Articles;
