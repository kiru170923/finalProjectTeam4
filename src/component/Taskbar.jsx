import React from 'react';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Taskbar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'))|| null;


    return (
        <div className="d-flex flex-column align-items-center p-3 bg-white shadow-sm" style={{ width: '60px', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
            <FaBars size={24} className="mb-4" style={{ cursor: 'pointer' }} />
            <FaHome size={24} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
            <FaSearch size={24} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/search')} />
            {currentUser?<>
            <FaPlusSquare size={24} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/create')} />
            <FaHeart size={24} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/home/favorites')} />
            <FaUser size={24} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')} /></>: <></>}
        </div>
        
    );
};

export default Taskbar;