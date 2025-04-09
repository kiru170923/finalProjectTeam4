import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Taskbar = () => {

    const {isLogin} = useContext(ThemeContext);
    
    return (
        <div className="taskbar">
            <NavLink title='Trang chủ' to="/home" className="icon icon-home" />
          
            
            {isLogin && (
                <>
                  <NavLink title='Tìm kiếm bạn bè' to="/search" className="icon icon-search" />
                <NavLink title='Chat với bạn' to="/chat" className="icon icon-chat" />
                    <NavLink title='Tạo 1 bài viết' to="/create" className="icon icon-create" />
                    <NavLink title='Xem bài viết của những người đã thích' to="/home/favorites" className="icon icon-favorites" />
                    <NavLink title='Trang cá nhân' to="/profile" className="icon icon-profile" />
                </>
            )}
        </div>
    );
};

export default Taskbar;
