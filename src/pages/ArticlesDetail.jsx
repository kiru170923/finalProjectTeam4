import React, { useContext, useEffect, useState } from 'react';
import { getCurrentArticle, getCurrentArticleComment, setFavoriteArticle, unsetFavoriteArticle } from '../service/articles';
import { Link, useParams } from 'react-router-dom';
import Comment from '../component/Comment';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';
import { deleteCurrentComment } from '../service/comments';
import Viewer from "react-viewer";
import { FiHeart, FiMessageSquare, FiRepeat, FiTrash2, FiClock } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import '../Style/ArticleDetail.css'
import UserPreviewProfile from '../component/UserPreviewProfile';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Share from '../component/Share';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';

const ArticlesDetail = () => {
    const { slug } = useParams();
        const [show, setShow] = useState(false)
    const [currentArticle, setCurrentArticle] = useState(null);
    const [currentComments, setCurrentComments] = useState([]);
    const [favorite, setFavorite] = useState(false);
    const [visible, setVisible] = useState(false);
    const { setReload, reload, getFormatTime } = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
   const [articlePicture, setArticlePicture] = useState([])
    

    useEffect(() => {
        getCurrentArticle(slug).then(res => {
            setCurrentArticle(res.article);
            setFavorite(res.article.favorited);
        });

        getCurrentArticleComment(slug).then(res => {
            setCurrentComments(res.comments);
        });
    }, [slug, reload]);

    const changeFavoriteStatus = () => {
        if (!favorite) {
            setFavorite(true);
            setFavoriteArticle(slug).then((res) => {
                setCurrentArticle(res.article);
            });
        } else {
            setFavorite(false);
            unsetFavoriteArticle(slug).then((res) => {
                setCurrentArticle(res.article);
            });
        }
    };

    function getImageForArticle(slug){
        const imageList = articlePicture.filter((msg) => msg.data.slug === slug )
        return imageList.length > 0 ? imageList[0].data.image : [];
      }
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
      

    const parseCommentContent = (content) => {
        const regex = /!\[image\]\((.*?)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.substring(lastIndex, match.index)
                });
            }
            parts.push({
                type: 'image',
                content: match[1]
            });
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.substring(lastIndex)
            });
        }

        return parts;
    };

    const deleteComment = (id) => {
        deleteCurrentComment(slug, id).then(res => {
            toast.success("Xóa bình luận thành công");
            setReload((pre) => !pre);
        });
    };

    if (!currentArticle) {
        return <ArticleDetailSkeleton />;
    }

    return (
        <div className="article-detail-container">
            <div className="article-detail-card">
                <div className="article-header">
                    <div className="author-info">
                        <UserPreviewProfile author = {currentArticle.author}/>
                        <div className="author-details">
                            <span className="author-name">
                                {currentArticle.author?.username || 'Unknown'}
                                {currentArticle.author?.username === currentUser?.username && (
                                    <span className="you-badge">Bạn</span>
                                )}
                            </span>
                            <span className="article-time">
                                <FiClock className="time-icon" />
                                {getFormatTime(currentArticle.createdAt)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="article-actions">
                        <button 
                            className={`action-btn ${favorite ? 'active' : ''}`}
                            onClick={changeFavoriteStatus}
                        >
                            {favorite ? (
                                <FaHeart className="action-icon" />
                            ) : (
                                <FiHeart className="action-icon" />
                            )}
                            <span>{currentArticle.favoritesCount}</span>
                        </button>
                        
                       
                        
                        <button className="action-btn" onMouseEnter={()=>setShow(true)} onMouseLeave={()=> setShow(false)}>
                            <Share  postUrl={`https://final-project-team4.vercel.app/articles/${currentArticle.slug}`} postTitle = {currentArticle.title} show = {show} setShow = {setShow}/>
                        </button>
                    </div>
                </div>

                <div className="article-content">
                <p className="article-title">{currentArticle.title}</p>
                <p  className="article-description pt-2 pb-2">{currentArticle.description}</p>
            { !getImageForArticle(currentArticle.slug).length == 0 ?
            <div className='image-section d-flex justify-content-start gap-1' style={{ maxWidth:'672px',overflow:'auto', height:'280px', display:'flex',
                flexDirection:'row'
                    
                 }}><LightGallery speed={100} elementClassNames="d-flex gap-1" style={{
                    maxWidth: '692px',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    {getImageForArticle(currentArticle.slug).map((image, index) => (
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

                <div className="comments-section">
                    <h3 className="section-title">
                        <FiMessageSquare className="title-icon" />
                        Bình luận
                    </h3>
                    
                    <Comment slug={slug} />
                    
                    {currentComments.map((comment) => {
                        if (!comment.body) return null;
                        const parts = parseCommentContent(comment.body);

                        return (
                            <div className="comment-card" key={comment.id}>
                                <div className="comment-header">
                                    <div className="comment-author">
                                        <img 
                                            src={comment.author.image || '/default-avatar.png'} 
                                            alt={comment.author.username}
                                            className="comment-avatar"
                                        />
                                        <div className="comment-author-info">
                                            <span className="comment-author-name">
                                                {comment.author.username}
                                                {comment.author.username === currentUser?.username && (
                                                    <span className="you-badge">Bạn</span>
                                                )}
                                            </span>
                                            <span className="comment-time">
                                                <FiClock className="time-icon" />
                                                {getFormatTime(comment.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {comment.author.username === currentUser?.username && (
                                        <button 
                                            className="delete-comment-btn"
                                            onClick={() => deleteComment(comment.id)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="comment-content">
                                    {parts.some(part => part.type === 'text') && (
                                        <p className="comment-text">
                                            {parts.filter(part => part.type === 'text').map(part => part.content).join(' ')}
                                        </p>
                                    )}
                                    
                                    {parts.filter(part => part.type === 'image').length > 0 && (
                                        <div className="comment-images">
                                            {parts.filter(part => part.type === 'image').map((part, index) => (
                                                <div key={index} className="comment-image-container">
                                                    <img 
                                                        src={part.content} 
                                                        alt="comment" 
                                                        className="comment-image"
                                                        onClick={() => setVisible(true)}
                                                    />
                                                    <Viewer
                                                        visible={visible}
                                                        onClose={() => setVisible(false)}
                                                        images={[{ src: part.content, alt: 'image' }]}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
             <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
        </div>
    );
};

// Skeleton Loading Component
const ArticleDetailSkeleton = () => {
    return (
        <div className="article-detail-skeleton">
            <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-author">
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line shorter"></div>
                </div>
            </div>
            
            <div className="skeleton-content">
                <div className="skeleton-line long"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line medium"></div>
            </div>
            
            <div className="skeleton-comments">
                <div className="skeleton-comment">
                    <div className="skeleton-comment-header">
                        <div className="skeleton-avatar small"></div>
                        <div className="skeleton-comment-author">
                            <div className="skeleton-line very-short"></div>
                            <div className="skeleton-line shortest"></div>
                        </div>
                    </div>
                    <div className="skeleton-comment-content">
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ArticlesDetail;