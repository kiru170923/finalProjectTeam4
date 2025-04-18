import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { followAnUser, unFollowAnUser } from '../service/user';
import { getArticlesFromUsersYouFollowed, getCurrentFavoriteStatus } from '../service/articles';
import { ThemeContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "date-fns";


const UserPreviewProfile = ({ author, e, followed}) => {
    const [followingArticlesList, setFollowingArticlesList] = useState([]);
    const [follow, setFollow] = useState(false);
    const target = useRef(null);
    const token = localStorage.getItem('token') || '';
    const { isLogin, setReload, getFormatTime } = useContext(ThemeContext);
    const nav = useNavigate();
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const isProfile = location.pathname === "/profile";
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        getArticlesFromUsersYouFollowed(token).then(res => {
            setFollowingArticlesList(res?.articles);
        });
    }, []);

    useEffect(()=>{
        if(followed){
            setFollow(follow)
        }
    },[])

    useEffect(() => {
        if(author){
            getCurrentFavoriteStatus(author.username).then(res => {
                setFollow(res.profile.following);
            });
        }
        }, [author?.following, author, followed ]);

    const popover = useMemo(()=>{

        return (
            <Popover 
            id="popover-basic" 
            className="custom-popover"
            style={{
                backgroundColor: '#E6F3FA', 
                border: '1px solid #B3D9E6', 
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
        >
            <Popover.Header 
                as="h3" 
                style={{ 
                    backgroundColor: '#B3D9E6',
                    color: '#4DA8CC', 
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
                            color: '#4DA8CC', 
                            fontSize: '1.1rem',
                        }}
                    >
                        {author?.username}
                    </b>
                    <br />
                    <div 
                        className="d-flex justify-content-around align-items-center" 
                        style={{ color: '#4DA8CC' }} 
                    >
                        <div>Frontend Developer</div>
                        <div>
                            <img 
                                src={author?.image} 
                                style={{ 
                                    objectFit: 'cover',
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%', 
                                    border: '2px solid #80C4DE', 
                                }} 
                            />
                        </div>
                    </div>
                    <br />
                    <div style={{ 
                        color: '#3D8AA6', 
                        fontSize: '0.9rem',
                        textAlign: 'center',
                    }}>
                        {author?.bio}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <>{currentUser?.username != author?.username && currentUser ?
                        
                        <button 
                        style={{ 
                            width: '100%', 
                            backgroundColor: follow ? '#F28C8C' : '#4DA8CC', 
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            fontSize: '0.9rem',
                            transition: 'background-color 0.3s',
                        }} 
                        className={follow ? "btn btn-sm mt-2" : "btn btn-sm mt-2"}
                        onClick={(e) => {setFollowUser(); e.stopPropagation()}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = follow ? '#E67E7E' : '#3D8AA6'} 
                        onMouseLeave={(e) => e.target.style.backgroundColor = follow ? '#F28C8C' : '#4DA8CC'}
                    >
                        {follow ? 'Unfollow' : 'Follow'}
                    </button>
                    :<div></div>}</>
                        
                    </div>
                </div>
            </Popover.Body>
        </Popover>
        )
    },[author?.username, author?.image, author?.bio, follow])

    function followUser() {
        
     if(author ){
        followAnUser(author?.username).then((res) => {
            setFollow(res.profile.following);
        });
     }

    }

    function unFollowUser() { 
       
      if(author){
        unFollowAnUser(author?.username).then((res) => {
            setFollow(res.profile.following);

        });
      }
    }

    function setFollowUser(e) {
        if (follow) {
            unFollowUser(e);
        } else {
            followUser(e);
        }
    }

    return (
        <>
          {!isProfile ? (
            <div
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              style={{ display: "inline-block" }}
            >
              <OverlayTrigger
                placement="top"
                overlay={popover}
                show={show}
                transition={false}
              >
                <img
                  onClick={(e) => {
                    author.username != currentUser.username && nav("/profile", { state:{
                        author: author,
                        follow: follow,
                    }  });
                    e.stopPropagation();
                  }}
                  ref={target}
                  src={author?.image}
                  width="50"
                  height="50"
                  alt="User Avatar"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "2px solid #80C4DE",
                    transition: "transform 0.2s",
                    objectFit: "cover",
                  }}
                />
              </OverlayTrigger>
            </div>
          ) : (
            <div>
              
                <button
                  style={{
                    width: "100%",
                    backgroundColor: followed ? "#F28C8C" : "#4DA8CC",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s",
                  }}
                  className="btn btn-sm mt-2"
                  onClick={(e) => {
                    setFollowUser();
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = followed ? "#E67E7E" : "#3D8AA6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = followed ? "#F28C8C" : "#4DA8CC")
                  }
                >
                  {followed ? "Unfollow" : "Follow"}
                </button>
              
            </div>
          )}
        </>
      );
};

export default UserPreviewProfile;