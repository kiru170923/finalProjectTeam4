import React, { useEffect, useState } from 'react';
import { getFavoritedArticles } from '../service/articles';
import { Link } from 'react-router-dom';

const FavoritedArticles = () => {
    const [favoritedArticles, setFavoritedArticles] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!currentUser) return;
        getFavoritedArticles(currentUser.username).then(res => {
            setFavoritedArticles(res.articles || []);
        });
    }, []);

    return (
        <div className="p-3">
            {favoritedArticles.length === 0 ? (
                <p className="text-center text-muted mt-4">Bạn chưa thích bài viết nào.</p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {favoritedArticles.map((article) => (
                        <Link 
                            to={`/articles/${article.slug}`} 
                            key={article.slug} 
                            className="text-decoration-none text-dark"
                        >
                            <div 
                                className="border rounded-3 p-3 shadow-sm bg-white" 
                                style={{ 
                                    transition: 'transform 0.2s', 
                                    cursor: 'pointer' 
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p >{article.title}</p>
                                        <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{article.description}</p>
                                        <hr></hr>
                                        <p className="mb-1" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                                            
                                            ❤️ {article.favoritesCount} lượt thích
                                        </p>
                                    </div>
                                   
                                </div>
                                <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
                                    Tác giả: <strong>{article.author.username}</strong>  <img 
                                        src={article.author.image || 'https://via.placeholder.com/40'} 
                                        alt={article.author.username} 
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: '2px solid #80C4DE',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </p>
                                <hr></hr>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritedArticles;
