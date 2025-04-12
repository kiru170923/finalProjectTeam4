import React, { useContext, useEffect, useState } from 'react';
import { setUser } from '../service/user';
import toast from 'react-hot-toast';
import { setLogin } from '../service/user';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import LoginByGoogle from './LoginByGoogle';
import LoadingOverlay from '../component/LoadingOverlay';

const Login = () => {
    const nav = useNavigate();
    const { setIsLogin } = useContext(ThemeContext);
    const { isLogin } = useContext(ThemeContext);
        const [hide, setHide] = useState(true);
    
    
    const [currentAccountInfo, setCurrentAccountInfo] = useState({
        user: {
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        if (isLogin) {
            setLogin(currentAccountInfo).then((res) => {
                localStorage.setItem('token', res.user.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                toast.success("Login Successful!");
                nav('/home');
            }).catch(errors => {
                setIsLogin(false);
                toast.error("Invalid Email or Password.");
            });
        }
    }, [isLogin]);

    function getUserInformation(event) {
        setCurrentAccountInfo((pre) => ({
            user: { ...pre.user, [event.target.name]: event.target.value }
        }));
    }

    return (
        <div className="login-container" style={{
            backgroundColor: '#E6F7FF',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div className="login-box" style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '400px',
                textAlign: 'center',
                border: '2px solid #B3E0FF'
            }}>
                <h2 style={{
                    color: '#4DA8DA',
                    marginBottom: '30px',
                    fontSize: '28px',
                    fontWeight: 'bold'
                }}>Welcome Back!</h2>
                
                <div className="input-group" style={{ marginBottom: '20px', display:'flex', flexDirection:'column' }}>
                    <input 
                        type="text"
                        onChange={getUserInformation}
                        className="form-control w-100"
                        name="email"
                        placeholder="Email"
                        style={{
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '2px solid #B3E0FF',
                            fontSize: '16px',
                            marginBottom: '15px'
                        }}
                    />
                    <input
                        type={hide? "password": 'text'}
                        
                        onChange={getUserInformation}
                        className="form-control w-100"
                        name="password"
                        placeholder="Password"
                        style={{
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '2px solid #B3E0FF',
                            fontSize: '16px'
                        }}
                    />
                    <div style={{position:'absolute', zIndex:'1000', cursor:'pointer', left:'88%', top:'70%'}} onClick={()=>setHide((pre)=>!pre)}><img className='hide-button' style={{width:'22px'}} src={hide? '/images/show.svg':
                        '/images/hide.svg'  
                    }></img></div>
                </div>

                <LoadingOverlay />

                <div className="button-group" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '25px'
                }}>
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        style={{
                            backgroundColor: '#4DA8DA',
                            color: 'white',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            flex: 1,
                            marginRight: '10px',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#3D8EB0'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4DA8DA'}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => nav('/signup')}
                        style={{
                            backgroundColor: '#80C4E6',
                            color: 'white',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            flex: 1,
                            marginLeft: '10px',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#6CB0D9'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#80C4E6'}
                    >
                        Sign Up
                    </button>
                    <div><LoginByGoogle/></div>
                </div>

                <div style={{
                    marginTop: '20px',
                    color: '#7F7F7F',
                    fontSize: '14px'
                }}>
                    <p>Or continue with</p>
                    {/* <LoginByGoogle /> */}
                </div>
            </div>
        </div>
    );
};

export default Login;