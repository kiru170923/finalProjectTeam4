import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Taskbar = () => {

    const {isLogin} = useContext(ThemeContext);
    
    return (
        <div className="taskbar">
            <NavLink to="/home" className="icon icon-bars" />
            <NavLink to="/home" className="icon icon-home" />
            <NavLink to="/search" className="icon icon-search" />
            <NavLink to="/chat" className="icon icon-chat" />
            {isLogin && (
                <>
                    <NavLink to="/create" className="icon icon-create" />
                    <NavLink to="/home/favorites" className="icon icon-favorites" />
                    <NavLink to="/profile" className="icon icon-profile" />
                </>
            )}
        </div>
    );
};

export default Taskbar;
