import React, { useEffect, useState } from 'react';
import { getArticlesByUsername } from '../service/articles';
import { useNavigate } from 'react-router-dom';

const CurrentPost = ({ currentUser }) => {
    const [currentUserArticles, setCurrentUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        if (currentUser) {
            getArticlesByUsername(currentUser.username).then((res) => {
                setCurrentUserArticles(res.articles);
                setLoading(false);
            });
        }
    }, [currentUser]);

    return (
        <div className='p-3'>
            {loading && (
                <div className="text-center">
                    <img style={{ width: '400px' }} src='/images/loading.gif' alt="Loading..." />
                </div>
            )}

            {currentUserArticles.length === 0 ? (
                <div className="text-center">
                    <img src='/images/nothing.png' width={'300px'} alt="No articles" />
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {currentUserArticles.map((article, index) => (
                        <div
                            key={article.slug || index}
                            className="border rounded-3 p-3 shadow-sm bg-white text-decoration-none text-dark"
                            style={{
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                            onClick={() => nav('/articles/' + article?.slug)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="fw-bold mb-1">{article.title}</p>
                                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>{article.description}</p>
                                    <hr />
                                    <p className="mb-1" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                                        ❤️ {article.favoritesCount || 0} lượt thích
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
                                Tác giả: <strong>{article.author.username}</strong>{' '}
                                <img
                                    src={article.author.image || 'https://via.placeholder.com/40'}
                                    alt={article.author.username}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '2px solid #80C4DE',
                                        objectFit: 'cover',
                                        marginLeft: '8px'
                                    }}
                                />
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrentPost;
