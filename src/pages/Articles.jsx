import React, { useContext, useEffect, useState } from 'react';
import { getArticles, setFavoriteArticle, unsetFavoriteArticle, DeleteArticle, getArticlesAsGuest } from '../service/articles';
import { ThemeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import BootstrapModal from '../component/BootstrapModal';
import toast from 'react-hot-toast';
import SettingsMenu from '../component/SettingMenu';
import UserPreviewProfile from '../component/UserPreviewProfile';
import ArticlesFollowed from './ArticlesFollowed';
import Swal from 'sweetalert2';
import Taskbar from '../component/Taskbar';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLogin, setReload, getFormatTime } = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [reload, sReload] = useState(false);
    const nav = useNavigate();
    const { article } = useParams();

    useEffect(() => {
        (currentUser ? getArticles(currentUser.token) : getArticlesAsGuest())
            .then(data => {
                setArticles(data.articles);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
                setArticles([]);
                setLoading(false);
            });
    }, [reload]);

    function goToThisArticle(slug) {
        nav('/articles/' + slug);
    }

    const requireLogin = () => {
        Swal.fire({
            title: "Bạn chưa đăng nhập!",
            text: "Vui lòng đăng nhập để tiếp tục.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đăng nhập",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/login";
            }
        });
    };

    function DeleteThisArticle(slug, e) {
        e.stopPropagation();
        // DeleteArticle(slug).then(res => {
        //     if (!res.errors) {
        //         toast.success("Delete successfully!");
        //         setArticles(prev => prev.filter(article => article.slug !== slug));
        //     } else {
        //         toast.error("Delete failed!");
        //     }
        // });

        toast.promise(
            DeleteArticle(slug),{
                loading: "deleting...",
                success: ()=>{
                    toast.success("Delete successfully!");
                    setArticles(prev => prev.filter(article => article.slug !== slug));
                },
                error: "Delete failed!"
            }
        )
    }
    function changeFavoriteStatus(e, favorite, slug) {
        e.stopPropagation();
        setArticles(prevArticles =>
            prevArticles.map(article =>
                article.slug === slug
                    ? {
                        ...article,
                        favorited: !favorite,
                        favoritesCount: favorite ? article.favoritesCount - 1 : article.favoritesCount + 1
                    }
                    : article
            )
        );
        if (!favorite) {
            setFavoriteArticle(slug);
        } else {
            unsetFavoriteArticle(slug);
        }
    }
    return (
        <div className='border rounded-top-4 shadow-sm p-3 pt-0 mt-0 bg-white'
            style={{ width: '615px', margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='d-flex justify-content-between w-100 mb-3'>
               
            </div>
            <div className='articles' style={{ width: '590px' }}>
                <BootstrapModal />
                <hr />
                {loading ? <div className="text-center"><img style={{width:'400px'}} src='/images/loading.gif'></img></div> : null}
                {Array.isArray(articles) && articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={article.slug || index}
                            className='article_overview p-3 rounded mb-3 shadow-sm'
                            onClick={(e) => { currentUser ? goToThisArticle(article.slug) : requireLogin(); e.stopPropagation(); }}
                            style={{ cursor: 'pointer', transition: '0.3s', backgroundColor: '#fdfdfd' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfdfd'}>

                            <div className='row align-items-center'>
                                <div className='col-auto'>
                                    <div className='d-flex justify-content-center align-items-start mt-0 rounded-circle'
                                        onClick={(e) => e.stopPropagation()}>
                                        {currentUser ? <UserPreviewProfile author={article?.author} /> : <div style={{ width: '40px', height: '40px' }}>
                                            {<img style={{ width: '100%', height: '100%', borderRadius: '100%' }} src={article.author.image}></img>}</div>}
                                    </div>
                                </div>
                                <div className='col-auto'>
                                    <b>{article?.author?.username + (article?.author?.username === currentUser?.username ? ' (Bạn)' : '')}</b>
                                    <p className='text-muted' style={{ fontSize: '12px' }}>
                                        {article.createdAt ? getFormatTime(article.createdAt) : "Unknown time"}
                                    </p>
                                </div>
                                <div className='col ms-auto d-flex justify-content-end align-items-center'>
                                    {article?.author.username === currentUser?.username && (
                                        <SettingsMenu DeleteThisArticle={DeleteThisArticle} slug={article.slug} />
                                    )}
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h6 className='fw-bold'>{article.title}</h6>
                                <p className='text-muted'>{article.description}</p>
                            </div>
                            <div className='d-flex gap-2 mt-2'>
                                {currentUser && (
                                    <>
                                        <button onClick={(e) => changeFavoriteStatus(e, article.favorited, article.slug)}
                                            className='btn btn-outline-danger btn-sm'>
                                            {article?.favorited ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>} {article.favoritesCount}
                                        </button>
                                        <button className='btn btn-outline-secondary btn-sm'><i className="bi bi-chat"></i></button>
                                        <button className='btn btn-outline-primary btn-sm'><i className="bi bi-arrow-repeat"></i></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center"></p>
                )}
            </div>
            <div><ArticlesFollowed /></div>
        </div>
    );
};

export default Articles;