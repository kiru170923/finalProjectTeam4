import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeContext } from '../App';
import { auth } from '../config/firebaseConfig';

const Header = () => {
    const { isLogin, setIsLogin } = useContext(ThemeContext);
    const location = useLocation();
    const chat = location.pathname === "/chat";
    const [showLogo, setShowLogo] = useState(false);
    const [showGun,setShowGun] = useState(false)
    const [dan, setDan] = useState(false);
    const [ logoCung, setLogoCung] = useState(false);

    // Lấy token để duy trì đăng nhập
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
    }, [localStorage.getItem('token')]);
    // <button onClick={()=> auth.signOut()}>Logout</button>

    useEffect(()=>{
        setTimeout(() => {
            setLogoCung(true)
        }, 8230);
        
    }, [])
   
   useEffect(()=>{
    setTimeout(() => {
        setShowLogo(true);
    }, 1400);
   },[])

   useEffect(()=>{
    setTimeout(() => {
        setDan(true)
    }, 5600);
   }, [])

   useEffect(()=>{
    setTimeout(() => {
        setShowGun(true)
    }, 4200);
    setTimeout(() => {
        setShowGun(false)
    }, 8100);
   },[])

    return (
        <div style={{position:'relative'}}>
        { <div 
            
            className='header pt-0' 
            style={{ 
                width: '96vw', 
                background: 'linear-gradient(135deg, #E6F3FA 0%, #F0F8FC 100%)', 
                borderBottom: '1px solid #B3D9E6', 
                padding: '10px 0',
                marginLeft:'4%'
            }}
        >
             {showGun && <div className='gun0' style={{width:"120px",height:"70px", backgroundSize:'cover' , position:'absolute', left:'0px', top:'10px'
    , backgroundImage: 'url("/images/gun0.png")'

 }}></div>}

{dan && <img className='dan' width={'20px'} style={{position:'absolute', top:'40px', left:"150px"}} src='/images/thread.svg'/> }
            
            
<div className="header-text d-flex justify-content-center align-items-center mb-1" style={{ color: '#6dc7d6', width: "100%", minHeight:'28px' }}>
            {showLogo && 
 <>
 {/* {showGun && <img style={{width:"120px", position:'absolute', left:'0px', top:'10px'}} src='/images/gun.gif'></img>} */}

  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% - 120px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>T</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% - 90px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>h</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% - 60px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>r</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% - 30px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>e</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% )', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>a</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% + 30px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>d</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% + 60px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>e</h3>
  </div>
  <div style={{ position: 'absolute', top: '70px', left: 'calc(50% + 90px)', transform: 'translate(-50%, -50%)' }}>
    <h3 style={{ fontFamily: "Nanum Brush Script", fontSize: '80px' }}>r</h3>
  </div></>}
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
                                        <li
                                            
                                            onClick={() => {
                                                setIsLogin(false);
                                                auth.signOut();
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
{showLogo &&                     <Link to={'/home'}>
                    
                    <div>
                        <div className='logo'
                             
                            style={{ 
                                width: '70px', 
                                borderRadius: '10px', 
                                position: 'absolute', 
                                top: '10px', 
                                left: 'calc(50% - 170px)',
                                transition: 'transform 0.3s',
                                backgroundImage: !logoCung? 'url("/images/twitterLogo.gif")': 'url("/images/logo.png")',
                                backgroundSize:'cover',
                                height:'70px'
                            
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            alt="Logo"
                        />
                    </div>
                </Link>}
                </ul>
            </header>
        </div> }
       

        </div>
    );
};

export default Header;