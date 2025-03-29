import React, { useContext, useEffect, useState } from 'react';
import { getCurrentArticle, getCurrentArticleComment, setFavoriteArticle, unsetFavoriteArticle } from '../service/articles';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../component/Comment';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';
import {deleteCurrentComment} from '../service/comments'

const ArticlesDetail = () => {
    const { slug } = useParams();
    const [currentArticles, setCurrentArticles] = useState('');
    const [currentComments, setCurrentComments] = useState([]);
    const nav = useNavigate();
    const {setReload, reload, currentUser} = useContext(ThemeContext);
    

    useEffect(() => {
        getCurrentArticle(slug).then(res => {
            setCurrentArticles(res.article);
        });
        getCurrentArticleComment(slug).then(res => {
            setCurrentComments(res.comments);
            console.log(res.comments);
        });
    }, [slug, reload]);

    function ChangeFavoriteSatus() {
        if (!currentArticles.favorited) {
            setFavoriteArticle(slug).then((res) => {
                setCurrentArticles(res.article);
            });
        } else {
            unsetFavoriteArticle(slug).then((res) => {
                setCurrentArticles(res.article);
            });
        }
    }

    function parseCommentContent(content) {
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
    }

    //del
    function deleteComment(id){
        deleteCurrentComment(slug, id).then(res =>{
            toast.success("Delete succesfully")
            setReload((pre) => !pre);
        })
    }

    return (
        <div className="container mt-4">
            <div className="article-card shadow-sm border rounded p-3" style={{
                maxWidth: '700px',
                margin: '0 auto',
                borderRadius: '15px',
                backgroundColor: '#fff'
            }}>
                <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        <img src='/src/assets/images/logo.PNG' alt="logo" style={{
                            width: '45px', height: '45px', borderRadius: '50%'
                        }} />
                        <b>{currentArticles.author ? currentArticles.author.username : 'Unknown'}</b>
                    </div>
                    <div className="d-flex gap-2">
                        <button onClick={ChangeFavoriteSatus} className="btn btn-light btn-sm">
                            {currentArticles.favorited ? (
                                <i className="bi bi-heart-fill text-danger"></i>
                            ) : (
                                <i className="bi bi-heart"></i>
                            )} {currentArticles.favoritesCount}
                        </button>
                        <button className="btn btn-light btn-sm"><i className="bi bi-chat"></i></button>
                        <button className="btn btn-light btn-sm"><i className="bi bi-arrow-repeat"></i></button>
                    </div>
                </div>

                <div className="mt-3">
                    <h5 className="fw-bold">{currentArticles.title}</h5>
                    <p className="text-muted">{currentArticles.body}</p>
                </div>

                <hr />

                <div className="comment-section mt-3">
                    <h6 className="text-center fw-bold">Bình luận</h6>
                    <hr />
                    <div><Comment slug={slug} /></div>
                    <hr></hr>
                    {currentComments.map((comment, index) => {
                        if (!comment.body) return null;
                        const parts = parseCommentContent(comment.body);

                        return (

                            
                            <div className="comment-card p-2 mb-3 rounded shadow-sm" style={{
                                backgroundColor: '#f8f9fa'
                            }} key={comment.id}>
                                {currentUser && comment.author.username === currentUser.username ? (
    <button onClick={() => deleteComment(comment.id)}>Delete</button>
) : null}

                                {/* {comment.author.username === currentUser.username } */}
                                <div className="d-flex align-items-center gap-3">
                                    <img src={comment.author.image} alt="" style={{
                                        width: '35px', height: '35px', borderRadius: '50%'
                                    }} />
                                    <b>{comment.author.username + (comment.author.username === currentUser.username ? ' (Bạn)' : '')}</b>

                                    <span className="text-muted" style={{ fontSize: '12px' }}>20h</span>
                                </div>
                            
                                <div className="mt-2">
                                    {parts.some(part => part.type === 'text') && (
                                        <p className="m-0" style={{
                                            width: "94%",
                                            overflowWrap: "break-word",
                                        }}>
                                            {parts.filter(part => part.type === 'text').map(part => part.content).join(' ')}
                                        </p>
                                        
                                    )}
                                </div>

                                <div className="mt-2 d-flex flex-wrap gap-2">
                                    {parts.filter(part => part.type === 'image').map((part, index) => (
                                        <div key={index} className="image-box">
                                            <img src={part.content} alt="comment-img"
                                                className="rounded img-thumbnail"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                    transition: '0.3s',
                                                    border: '1px solid #ddd',
                                                    padding: '5px',
                                                    backgroundColor: '#fff'
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        );
                    })}
                    <hr />
                    
                </div>
            </div>
        </div>
    );
};

export default ArticlesDetail;
