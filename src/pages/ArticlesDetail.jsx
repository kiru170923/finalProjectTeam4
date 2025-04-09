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

const ArticlesDetail = () => {
    const { slug } = useParams();
    const [currentArticle, setCurrentArticle] = useState(null);
    const [currentComments, setCurrentComments] = useState([]);
    const [favorite, setFavorite] = useState(false);
    const [visible, setVisible] = useState(false);
    const { setReload, reload, getFormatTime } = useContext(ThemeContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));

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
                        
                        <Link to={''}><button className="action-btn">
                            <FiMessageSquare className="action-icon" />
                        </button></Link>
                        
                        <button className="action-btn">
                            <FiRepeat className="action-icon" />
                        </button>
                    </div>
                </div>

                <div className="article-content">
                    <h2 className="article-title">{currentArticle.title}</h2>
                    <div
  className="article-body"
  dangerouslySetInnerHTML={{ __html: currentArticle.body }}
></div>

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