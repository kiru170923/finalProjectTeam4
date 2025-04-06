import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { followAnUser, unFollowAnUser } from '../service/user';
import { getArticlesFromUsersYouFollowed, getCurrentFavoriteStatus } from '../service/articles';

const UserPreviewProfile = ({ author }) => {
    const [show, setShow] = useState(false);
    const [followingArticlesList, setFollowingArticlesList] = useState([]);
    const [follow, setFollow] = useState(false);
    const target = useRef(null);
    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        getArticlesFromUsersYouFollowed(token).then(res => {
            setFollowingArticlesList(res.articles);
            console.log(res.articles);
        });
    }, []);

    useEffect(() => {
        getCurrentFavoriteStatus(author.username).then(res => {
            setFollow(res.profile.following);
        });
    }, [author?.username]);

    const popover = (
        <Popover 
            id="popover-basic" 
            className="custom-popover"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            style={{
                backgroundColor: '#E6F3FA', // Nền xanh nhạt
                border: '1px solid #B3D9E6', // Viền xanh nhạt
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
            }}
        >
            <Popover.Header 
                as="h3" 
                style={{ 
                    backgroundColor: '#B3D9E6', // Header xanh nhạt hơn
                    color: '#4DA8CC', // Chữ xanh đậm
                    borderBottom: 'none',
                    textAlign: 'center',
                    padding: '10px',
                    fontSize: '1.2rem',
                }}
            >
                preview
            </Popover.Header>
            <Popover.Body style={{ padding: '15px' }}>
                <div>
                    <b 
                        className="d-flex justify-content-center align-items-center" 
                        style={{ 
                            color: '#4DA8CC', // Username xanh đậm
                            fontSize: '1.1rem',
                        }}
                    >
                        {author.username}
                    </b>
                    <br />
                    <div 
                        className="d-flex justify-content-around align-items-center" 
                        style={{ color: '#4DA8CC' }} // Chữ xanh đậm
                    >
                        <div>Frontend Developer</div>
                        <div>
                            <img 
                                src={author.image} 
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    border: '2px solid #80C4DE', // Viền ảnh xanh nhạt
                                }} 
                            />
                        </div>
                    </div>
                    <br />
                    <div style={{ 
                        color: '#3D8AA6', // Bio xanh đậm nhẹ
                        fontSize: '0.9rem',
                        textAlign: 'center',
                    }}>
                        {author?.bio}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button 
                            style={{ 
                                width: '100%', 
                                backgroundColor: follow ? '#F28C8C' : '#4DA8CC', // Unfollow đỏ nhạt, Follow xanh nhạt
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '6px 12px',
                                fontSize: '0.9rem',
                                transition: 'background-color 0.3s',
                            }} 
                            className={follow ? "btn btn-sm mt-2" : "btn btn-sm mt-2"}
                            onClick={() => setFollowUser()}
                            onMouseEnter={(e) => e.target.style.backgroundColor = follow ? '#E67E7E' : '#3D8AA6'} // Hover đậm hơn
                            onMouseLeave={(e) => e.target.style.backgroundColor = follow ? '#F28C8C' : '#4DA8CC'}
                        >
                            {follow ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>
            </Popover.Body>
        </Popover>
    );

    function followUser() {
        setFollow(true);
        followAnUser(author.username).then((res) => {
            console.log("Followed");
            console.log(res);
            setShow(false);
        });
    }

    function unFollowUser() { 
        setFollow(false);
        unFollowAnUser(author.username).then((res) => {
            console.log("unFollowed");
            console.log(res);
            setShow(false);
        });
    }

    function setFollowUser() {
        if (follow) {
            unFollowUser();
        } else {
            followUser();
        }
    }

    return (
        <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popover}
            show={show}
            delay={{ show: 200, hide: 400 }}
        >
            <img
                ref={target}
                src={author.image}
                width="40"
                height="40"
                alt="User Avatar"
                style={{ 
                    cursor: "pointer",
                    borderRadius: '50%',
                    border: '2px solid #80C4DE', // Viền ảnh ngoài xanh nhạt
                    transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                    setShow(true);
                    e.target.style.transform = 'scale(1.1)'; // Phóng to nhẹ khi hover
                }}
                onMouseLeave={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.closest(".popover")) {
                        setShow(false);
                    }
                    e.target.style.transform = 'scale(1)'; // Trở lại kích thước ban đầu
                }}
            />
        </OverlayTrigger>
    );
};

export default UserPreviewProfile;