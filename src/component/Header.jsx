import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';

const Header = () => {
    const { isLogin, setIsLogin } = useContext(ThemeContext);
    const location = useLocation();
    const chat = location.pathname === "/chat";

    // Lấy token để duy trì đăng nhập
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
    }, []);

    return (
        <div style={{position:'relative'}}>
        {!chat?  <div 
            
            className='header pt-0' 
            style={{ 
                width: '96vw', 
                background: 'linear-gradient(135deg, #E6F3FA 0%, #F0F8FC 100%)', 
                borderBottom: '1px solid #B3D9E6', 
                padding: '10px 0',
                marginLeft:'4%'
            }}
        >
             <div className="header-text d-flex justify-content-center align-items-center mb-1" style={{ color: '#6dc7d6' }}>
  <div style={{ position: 'absolute', top: '70px', left: '42%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>T</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '44%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>h</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '46%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>r</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '48%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>e</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>a</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '52%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>d</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '54%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>e</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: '56%', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>r</h3>
  </div>
</div>
            <header> 
                
                <ul 
                    className='gap-4 list-unstyled justify-content-center row pt-3 pb-2' 
                   
                >
                    
                    <div className='col-12 d-flex gap-5 justify-content-end p-4 pb-0 pt-0' >
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
                                <div >
                                    <NavLink to={'/login'}>
                                        <li ss
                                            
                                            onClick={() => {
                                                setIsLogin(false);
                                           
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('user');
                                            }} 
                                            className='btn'
                                            style={{
                                                backgroundColor: '#4382ddbd', 
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
                                                e.target.style.backgroundColor = '#46d5c0cf'; 
                                                e.target.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#4382ddbd';
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
                            <img className='logo'
                                src='/images/logo.png' 
                                style={{ 
                                    width: '70px', 
                                    borderRadius: '10px', 
                                    position: 'absolute', 
                                    top: '10px', 
                                    left: '40%',
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
        </div>:<div></div> }
       

        </div>
    );
};

export default Header;