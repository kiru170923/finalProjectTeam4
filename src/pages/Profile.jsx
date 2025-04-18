import React, { useContext, useEffect, useState } from 'react';
import CurrentPost from '../component/CurrentPost';
import EditProfileModal from '../component/ChangeProfileForm';
import { ThemeContext } from '../App';
import { Link, useLocation } from 'react-router-dom';
import LoadingOverlay from '../component/LoadingOverlay';
import UserPreviewProfile from '../component/UserPreviewProfile';
import FavoritedArticles from '../component/FavoritedArticles';

const Profile = () => {
    const location = useLocation();
    const userData = location.state || null;
    const { reload, setReload } = useContext(ThemeContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [section, setSection] = useState('Current Post');
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profile, setProfile] = useState(true)


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));//
        if (userData) {
            setCurrentUser(userData.author);
        } else {
            setCurrentUser(user);
        }
    }, [reload]);

    console.log(currentUser);

    function getSection(event) {
        const selectedSection = event.target.textContent;
        setSection(selectedSection);
    }

    return (
        <div 
            className="d-flex justify-content-center pt-4" 
            style={{ 
                background: 'linear-gradient(135deg, #E6F3FA 0%, #F0F8FC 100%)', // Gradient xanh nhạt
                minHeight: '100vh', 
                padding: '20px'
            }}
        >
                {/* <LoadingOverlay setLoadingProfile ={setLoadingProfile} loadingProfile = {loadingProfile}/> */}
            
            <div 
                className="border rounded-4 p-4 shadow-sm" 
                style={{ 
                    width: '600px', 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #B3D9E6', 
                    borderRadius: '12px', 
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.05)', // Bóng nhẹ
                    transition: 'transform 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p 
                            className="fw-bold mb-1" 
                            style={{ 
                                color: '#4DA8CC', 
                                fontSize: '1.5rem', 
                                letterSpacing: '0.5px' 
                            }}
                        >
                            {currentUser?.username}
                        </p>
                        <p 
                            className="text-muted" 
                            style={{ 
                                color: '#3D8AA6', 
                                fontStyle: 'italic', 
                                fontSize: '0.95rem' 
                            }}
                        >
                            {currentUser?.bio || 'Chưa có bio'}
                        </p>
                    </div>
                    <img 
                        style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            border: '3px solid #80C4DE', 
                            objectFit: 'cover', 
                            transition: 'transform 0.3s' 
                        }} 
                        className="border"
                        src={currentUser?.image || 'https://via.placeholder.com/60'} 
                        alt="Profile Logo" 
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                </div>

                <div className="text-center mt-3">
                    {userData ? <></> : (
                        <EditProfileModal /> 
                        
                    )}
                </div>

                {userData?<UserPreviewProfile current = {currentUser} profile = {profile} setProfile = {setProfile} followed = {userData.follow} />: <></> }
                

                <hr style={{ borderColor: '#B3D9E6', opacity: 0.5 }} />

                <ul 
                    className="list-unstyled d-flex justify-content-around fw-semibold" 
                    style={{ 
                        cursor: 'pointer', 
                        padding: '0 20px', 
                        marginBottom: '0' 
                    }}
                >
                    <li 
                        className={section === 'Current Post' ? 'pb-2' : ''} 
                        onClick={getSection}
                        style={{
                            color: section === 'Current Post' ? '#4DA8CC' : '#80C4DE',
                            padding: '10px 20px',
                            borderBottom: section === 'Current Post' ? '3px solid #4DA8CC' : 'none',
                            transition: 'color 0.3s, border-bottom 0.3s',
                            fontSize: '1.1rem'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#4DA8CC'}
                        onMouseLeave={(e) => e.target.style.color = section === 'Current Post' ? '#4DA8CC' : '#80C4DE'}
                    >
                        Current Post
                    </li>
                    {!userData && (
                        <li 
                            className={section === 'Bài viết đã thích' ? 'pb-2' : ''} 
                            onClick={getSection}
                            style={{
                                color: section === 'Bài viết đã thích' ? '#4DA8CC' : '#80C4DE',
                                padding: '10px 20px',
                                borderBottom: section === 'Bài viết đã thích' ? '3px solid #4DA8CC' : 'none',
                                transition: 'color 0.3s, border-bottom 0.3s',
                                fontSize: '1.1rem'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#4DA8CC'}
                            onMouseLeave={(e) => e.target.style.color = section === 'Bài viết đã thích' ? '#4DA8CC' : '#80C4DE'}
                        >
                            Bài viết đã thích
                        </li>
                    )}
                </ul>

                <hr style={{ borderColor: '#B3D9E6', opacity: 0.5 }} />

                <div 
                    style={{ 
                        padding: '0', 
                        backgroundColor: '#F0F8FC', 
                        borderRadius: '8px', 
                        minHeight: '200px' 
                    }}
                >
                    {section === 'Current Post' ? (
                        <CurrentPost currentUser={currentUser} />
                    ) : (
                       <FavoritedArticles/>
                    )}
                </div>
            </div>
            <div>    <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
                     
            
            </div>
        </div>
    );
};

export default Profile;