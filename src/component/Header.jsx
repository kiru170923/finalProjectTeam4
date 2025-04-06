import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header = () => {
    const { isLogin, setIsLogin } = useContext(ThemeContext);

    // Lấy token để duy trì đăng nhập
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
    }, []);

    return (
        <div 
            className='header' 
            style={{ 
                width: '95vw', 
                background: 'linear-gradient(135deg, #E6F3FA 0%, #F0F8FC 100%)', // Gradient xanh nhạt
                borderBottom: '1px solid #B3D9E6', // Viền dưới nhẹ
                padding: '10px 0',
                position: 'relative'
            }}
        >
            <header>
                <ul 
                    className='gap-4 list-unstyled justify-content-center row pt-3 pb-2' 
                    style={{ margin: 0 }}
                >
                    <div className='col-12 d-flex gap-5 justify-content-end p-4 pb-0 pt-0'>
                        {!isLogin ? (
                            <div className='d-flex gap-5 justify-content-center align-items-center'>
                                <NavLink to={'/signup'}>
                                    <li 
                                        className='btn'
                                        style={{
                                            backgroundColor: '#4DA8CC',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '20px', 
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                                            transition: 'background-color 0.3s, transform 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#3D8AA6'; 
                                            e.target.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#4DA8CC';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    >
                                        Sign Up
                                    </li>
                                </NavLink>
                                <NavLink to={'/login'}>
                                    <li 
                                        className='btn'
                                        style={{
                                            backgroundColor: '#4DA8CC',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '20px',
                                            padding: '6px 20px',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            transition: 'background-color 0.3s, transform 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#3D8AA6';
                                            e.target.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#4DA8CC';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    >
                                        Login
                                    </li>
                                </NavLink>
                            </div>
                        ) : (
                            <div className='d-flex gap-2'>
                                <div>
                                    <NavLink to={'/login'}>
                                        <li 
                                            onClick={() => {
                                                setIsLogin(false);
                                           
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('user');
                                            }} 
                                            className='btn'
                                            style={{
                                                backgroundColor: '#F28C8C', // Đỏ nhạt cho Sign Out
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '10px',
                                                padding: '6px 20px',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                transition: 'background-color 0.3s, transform 0.2s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#E67E7E'; // Hover đỏ đậm hơn
                                                e.target.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#F28C8C';
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        >
                                            Sign Out
                                        </li>
                                    </NavLink>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to={'/home'}>
                        <div>
                            <img 
                                src='/images/logo.png' 
                                style={{ 
                                    width: '90px', 
                                    borderRadius: '10px', 
                                    position: 'absolute', 
                                    top: '10px', 
                                    left: '80px',
                                    transition: 'transform 0.3s',
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                alt="Logo"
                            />
                        </div>
                    </Link>
                </ul>
            </header>
        </div>
    );
};

export default Header;