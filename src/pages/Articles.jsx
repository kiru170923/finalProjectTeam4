import React, { useContext, useEffect, useState } from 'react';
import { getArticles, setFavoriteArticle, unsetFavoriteArticle, DeleteArticle, getArticlesAsGuest, getArticlesFromUsersYouFollowed } from '../service/articles';
import { ThemeContext } from '../App';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import BootstrapModal from '../component/BootstrapModal';
import toast from 'react-hot-toast';
import SettingsMenu from '../component/SettingMenu';
import UserPreviewProfile from '../component/UserPreviewProfile';
import ArticlesFollowed from './ArticlesFollowed';
import Swal from 'sweetalert2';
import { FiHeart, FiMessageSquare, FiRepeat, FiMoreHorizontal, FiClock } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import Share from '../component/Share';


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLogin, setReload, getFormatTime, reload } = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const nav = useNavigate();
    const location = useLocation();
    const isFavoritePage = location.pathname === "/home/favorites";
    const isHomepage = location.pathname === "/home";
    const isHomepagee = location.pathname === "/";

   
    console.log(isFavoritePage)
    

    useEffect(() => {


        if (isFavoritePage && isLogin) {
            toast.promise(
                getArticlesFromUsersYouFollowed(currentUser.token),
                {
                    loading: 'Đang tải bài viết...',
                    success: (res) => {
                        setArticles(res?.articles || []);
                        return 'Tải bài viết thành công!';
                    },
                    error: 'Không thể tải bài viết, vui lòng thử lại sau!'
                }
            );
        }

        else{
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
        }
    }, [reload, isHomepage, isHomepagee, isFavoritePage]);


    // useEffect(() => {
    //     if (isFavoritePage) {
    //         toast.promise(
    //             getArticlesFromUsersYouFollowed(currentUser.token),
    //             {
    //                 loading: 'Đang tải bài viết...',
    //                 success: (res) => {
    //                     setArticles(res?.articles || []);
    //                     return 'Tải bài viết thành công!';
    //                 },
    //                 error: 'Không thể tải bài viết, vui lòng thử lại sau!'
    //             }
    //         );
    //     }
    // }, [isFavoritePage]);
    


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
        <div className="articles-container">
            <div className="articles-header">
                <h2 className="articles-title">
                    {isFavoritePage ? "Bài viết của những người đã theo dõi" : "Bài viết mới nhất"}
                </h2>
                {currentUser && <BootstrapModal setReload = {setReload} />}
            </div>

            {loading && (
                <div className="loading-container">
                    {[...Array(3)].map((_, i) => (
                        <ArticleSkeleton key={i} />
                    ))}
                </div>
            )}

            <div className="articles-list">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <ArticleItem
                            key={article.slug}
                            article={article}
                            currentUser={currentUser}
                            onArticleClick={currentUser ? () => goToThisArticle(article.slug) : requireLogin}
                            onFavoriteClick={(e) => changeFavoriteStatus(e, article.favorited, article.slug)}
                            onDeleteClick={(e) => DeleteThisArticle(article.slug, e)}
                            getFormatTime={getFormatTime}
                            isLogin = {isLogin}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <p className="empty-text">
                            {isFavoritePage 
                                ? "Bạn chưa lưu bài viết nào" 
                                : "Không có bài viết nào để hiển thị"}
                        </p>
                    </div>
                )}
            </div>

            {isLogin && (
                <div className="articles-sidebar">
                    <ArticlesFollowed />
                </div>
            )}
            {isFavoritePage? <div>    <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
            </div>: <></>}
        </div>
    );
};

const ArticleItem = ({ article, currentUser, onArticleClick, onFavoriteClick, onDeleteClick, getFormatTime, isLogin }) => {
    return (
        <div className="article-card" onClick={onArticleClick} style={{backgroundColor:'#faffff'}}>
            <div className="article-header">
                <div className="author-info">
                    <div><UserPreviewProfile author={article.author}/></div>
                    <div className="author-details">
                        <span className="author-name">
                           <label onClick={(e) => e.stopPropagation()} > {article.author.username}</label>
                            {currentUser?.username === article.author.username && (
                                <span className="you-badge">Bạn</span>
                            )}
                        </span>
                        <span className="article-time mt-0">
                                                           <FiClock className="time-icon" /> {getFormatTime(article.createdAt)}
                        </span>
                    </div>
                </div>
                
                {currentUser?.username === article.author.username && (
                    <SettingsMenu 
                        DeleteThisArticle={onDeleteClick} 
                        slug={article.slug}
                        icon={<FiMoreHorizontal />}
                    />
                )}
            </div>

            <div className="article-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
            </div>

            <div className="article-footer">
                {isLogin? <button title='Thích bài viết'
                    className={`action-btn ${article.favorited ? 'active' : ''}`}
                    onClick={(e) => onFavoriteClick(e)}
                >
                    {article.favorited ? (
                        <FaHeart  className="action-icon filled" />
                    ) : (
                        <FiHeart className="action-icon" />
                    )}
                    <span>{article.favoritesCount}</span>
                </button>: <></>}
                
                <button title='Bình luận' className="action-btn">
                    <FiMessageSquare className="action-icon" />
                    <span>Bình luận</span>
                </button>
                
                <button title='Chia sẻ bài viết' className="action-btn">
                    <span><Share postUrl={`https://final-project-team4.vercel.app/articles/${article.slug}`} postTitle = {article.title}/></span>
                </button>
            </div>
        </div>
    );
};

// Component ArticleSkeleton (for loading state)
const ArticleSkeleton = () => {
    return (
        <div className="article-skeleton">
            <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-author">
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line shorter"></div>
                </div>
            </div>
            <div className="skeleton-content">
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line long"></div>
            </div>
            <div className="skeleton-footer">
                <div className="skeleton-action"></div>
                <div className="skeleton-action"></div>
                <div className="skeleton-action"></div>
            </div>
        </div>
    );
};

export default Articles;