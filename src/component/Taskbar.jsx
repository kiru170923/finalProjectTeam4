import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Taskbar = () => {
    const { isLogin } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Kiểm tra nếu là mobile hoặc tablet
    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768); // dưới 768px coi là mobile/tablet
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const toggleTaskbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isMobile && (
                <div className="toggle-taskbar-btn" onClick={toggleTaskbar}>
                    <div  title="Mở thanh điều hướng" >
                      <img style={{width:"40px", position:'absolute', top:'100px', left:'20px'}} src='/images/more.svg'></img>
                    </div>
                    
                </div>
            )}

            <div className={`taskbar ${isMobile ? (isOpen ? 'open' : 'hidden') : ''}`}>
                <NavLink title='Trang chủ' to="/home" className="icon icon-home" />

                {isLogin && (
                    <>
                        <NavLink title='Tìm kiếm bạn bè' to="/search" className="icon icon-search" />
                        <NavLink title='Chat với bạn' to="/chat" className="icon icon-chat" />
                        <NavLink title='Tạo 1 bài viết' to="/create" className="icon icon-create" />
                        <NavLink title='Xem bài viết yêu thích' to="/home/favorites" className="icon icon-favorites" />
                        <NavLink
                            title='Trang cá nhân'
                            to={{
                                pathname: "/profile",
                                state: { from: "taskbar" }
                            }}
                            className="icon icon-profile"
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Taskbar;
