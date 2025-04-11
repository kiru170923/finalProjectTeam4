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
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import LoadingOverlay from '../component/LoadingOverlay';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLogin, setReload, getFormatTime, reload } = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const nav = useNavigate();
    const location = useLocation();
    const isHomepage = location.pathname === "/home";
    const isHomepagee = location.pathname === "/";
    const [articlePicture, setArticlePicture] = useState([])
    const [litmitArticleDisplay, setLimitArticleDisplay] = useState(5)
    const [typeArticle, setTypeArticle] = useState('thread')
    const [show, setShow] = useState(false)
    const [loadTrang,setLoadTrang] = useState(false);
    


    useEffect(()=>{
        if(typeArticle==='thread'){
            setLimitArticleDisplay(5);
        }
        else if(typeArticle==="twitter"){
            setLimitArticleDisplay(5);
        }
    }, [typeArticle])

    useEffect(()=>{
        const q = query(collection(db, 'articlesImage'));
              const unsubscribe = onSnapshot(q, snapshot => {
                setArticlePicture(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
                })));
              }
            ); 
              return () => unsubscribe();

    }, [])

   function getImageForArticle(slug){
     const imageList = articlePicture.filter((msg) => msg.data.slug === slug )
     return imageList.length > 0 ? imageList[0].data.image : [];
   }


   useEffect(()=>{
    if (location.pathname === "/home/favorites" && isLogin) {
        toast.promise(
            getArticlesFromUsersYouFollowed(currentUser.token),
            {
                loading: 'Đang tải bài viết...',
                success: (res) => {
                    setArticles(res?.articles || []);
                    setLoading(false)
                    return 'Tải bài viết thành công!';
                },
                error: 'Không thể tải bài viết, vui lòng thử lại sau!'
            }
        );
        
    }
   },[location.pathname === "/home/favorites"])
   
    useEffect(() => {

      
        (currentUser ? getArticles(currentUser.token, litmitArticleDisplay) : getArticlesAsGuest())
        .then(data => {
            setLoading(false);
            setArticles(data.articles);
           
        })
        .catch(error => {
            setLoading(false);
            console.error("Error fetching articles:", error);
            setArticles([]);
            
        });
        
    }, [reload, isHomepage, isHomepagee, litmitArticleDisplay]);


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

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const percent = (scrollTop / totalHeight) * 100;
          console.log(`Cuộn được: ${percent}%`);
          if(percent.toFixed(2)> 99){
            console.log('đang load')
            setLoadTrang(true)
            setTimeout(() => {
                setLoadTrang(false)
            }, 4000);
            setLimitArticleDisplay((pre) => pre + 4 )
            }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      

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
            <div className='switch-article_type d-flex justify-content-between gap-1' style={{backgroundColor:'#d0ecfa',
                 width:'20%', margin:'0 auto', borderRadius:'12px'}} >
                <div className='thread-section p-1' onClick={()=>setTypeArticle('thread')} ><img style={{width:'25px', height:'25px', opacity: typeArticle==='twitter' ? '0.2':'1'}} src='/images/thread.svg'></img></div>
                <div className='twitter-section p-1'  onClick={()=>setTypeArticle('twitter')}><img style={{width:'25px', height:'25px', opacity: typeArticle==='thread' ? '0.2':'1'}} src='/images/twitter.svg'></img></div>
            </div>
            <div className="articles-header">
                <h2 className="articles-title">
                    {location.pathname === "/home/favorites" ? "Bài viết của những người đã theo dõi" : "Bài viết mới nhất"}
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
                        !article.body&&typeArticle==='thread' ?
                        <ArticleItem
                            key={article.slug}
                            article={article}
                            currentUser={currentUser}
                            onArticleClick={currentUser ? () => goToThisArticle(article.slug) : requireLogin}
                            onFavoriteClick={(e) => changeFavoriteStatus(e, article.favorited, article.slug)}
                            onDeleteClick={(e) => DeleteThisArticle(article.slug, e)}
                            getFormatTime={getFormatTime}
                            isLogin = {isLogin}
                            getImageForArticle = {getImageForArticle}
                            setShow = {setShow}
                            show = {show}
                        /> : article.body && typeArticle === 'twitter'?<ArticleItem
                        key={article.slug}
                        article={article}
                        currentUser={currentUser}
                        onArticleClick={currentUser ? () => goToThisArticle(article.slug) : requireLogin}
                        onFavoriteClick={(e) => changeFavoriteStatus(e, article.favorited, article.slug)}
                        onDeleteClick={(e) => DeleteThisArticle(article.slug, e)}
                        getFormatTime={getFormatTime}
                        isLogin = {isLogin}
                        getImageForArticle = {getImageForArticle}
                        setShow = {setShow}
                        show = {show}
                    />:<></>
                        
                        
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <p className="empty-text">
                            {location.pathname === "/home/favorites" 
                                ? "Bạn chưa lưu bài viết nào" 
                                : "Không có bài viết nào để hiển thị"}
                        </p>
                    </div>
                )}
            </div>

            {/* {isLogin && (
                <div className="articles-sidebar">
                    <ArticlesFollowed />
                </div>
            )} */}
            {location.pathname === "/home/favorites"? <div>    <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
            </div>: <></>}
            
            {loadTrang?<div>
                <img src='/images/loading.gif'></img>
            </div>: <></>}
        </div>
    );
};

const ArticleItem = ({ article, currentUser, onArticleClick, onFavoriteClick, onDeleteClick, getFormatTime, isLogin, getImageForArticle, show, setShow }) => {
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
                <p className="article-title">{article.title}</p>
                <p  className="article-description pt-2 pb-2">{article.description}</p>
            { !getImageForArticle(article.slug).length == 0 ?
            <div className='image-section d-flex justify-content-start gap-1' style={{ maxWidth:'672px',overflow:'auto', height:'280px', display:'flex',
                flexDirection:'row'
                    
                 }}><LightGallery speed={100} elementClassNames="d-flex gap-1" style={{
                    maxWidth: '692px',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    {getImageForArticle(article.slug).map((image, index) => (
                      <a
                        key={index}
                        href={image}
                        target="_blank"
                        style={{ display: 'inline-block', textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={image}
                          alt={`image-${index}`}
                          loading="lazy"
                          style={{
                            width: "210px",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "9px"
                          }}
                        />
                      </a>
                    ))}
                  </LightGallery></div>: <></>}
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
                
                <div
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                        onClick={() => setShow(!show)}
                
                title='Chia sẻ bài viết' className="action-btn">
                    <span><Share  postUrl={`https://final-project-team4.vercel.app/articles/${article.slug}`} postTitle = {article.title} show = {show} setShow = {setShow}/></span>
                </div>
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