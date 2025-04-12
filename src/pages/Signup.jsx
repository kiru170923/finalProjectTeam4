import React, { useEffect, useState } from 'react';
import { setUser } from '../service/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../component/LoadingOverlay';

const Signup = () => {
    const nav = useNavigate();
    const [accountInfor, setAccountInfo] = useState({
        user: {
            username: '',
            email: '',
            password: ''
        }
    });
    const [signup, setSignup] = useState(false);
    const [hide, setHide] = useState(true);
    
    function setAccountInformation(event) {
        setAccountInfo((prev) => ({
            user: { ...prev.user, [event.target.name]: event.target.value }
        }));
    }
    
    useEffect(() => {
        if (signup) {
            toast.promise(
                setUser(accountInfor),
                {
                    loading: "Signing up...",
                    success: (user) => {
                        if (user.user) {
                            setTimeout(() => {
                                toast.success("Sign Up Successfully.");
                                nav('/login');
                            }, 1000);
                            return "Sign Up Successfully.";
                        } else {
                            throw user.errors;
                        }
                    },
                    error: (errors) => {
                        if (errors.email === "is already taken.") {
                            return "This Email is already taken.";
                        }
                        if (errors.username === "is already taken.") {
                            return "This Username is already taken.";
                        }
                        return "Please input valid information.";
                    }
                }
            ).finally(() => {
                setSignup(false); 
            });
        }
    }, [signup]);
    
    return (
        <div className="signup-container" style={{
            backgroundColor: '#E6F7FF',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div className="signup-box" style={{
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
                }}>Create Account</h2>
                
                <div className="input-group" style={{ marginBottom: '20px', display:'flex', flexDirection:'column' }}>
                    <input
                        required
                        onChange={setAccountInformation}
                        type="text"
                        className="form-control w-100"
                        name="username"
                        maxLength={'20'}
                        placeholder="Username"
                        style={{
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '2px solid #B3E0FF',
                            fontSize: '16px',
                            marginBottom: '15px'
                        }}
                    />
                    <input
                        required
                        onChange={setAccountInformation}
                        type="text"
                        className="form-control w-100"
                        maxLength={'20'}
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
                        required
                        onChange={setAccountInformation}
                        type={hide? "password": 'text'}
                        maxLength={'20'}
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
                    <div style={{position:'absolute', cursor:'pointer', left:'88%', top:'80%'}} onClick={()=>setHide((pre)=>!pre)}><img className='hide-button' style={{width:'22px'}} src={hide? '/images/show.svg':
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
                        onClick={() => setSignup(true)}
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
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#3D8EB0'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4DA8DA'}
                    >
                        Register
                    </button>
                </div>

                <div style={{
                    marginTop: '20px',
                    color: '#7F7F7F',
                    fontSize: '14px'
                }}>
                    <p>Already have an account? 
                        <span 
                            onClick={() => nav('/login')} 
                            style={{
                                color: '#4DA8DA',
                                cursor: 'pointer',
                                marginLeft: '5px',
                                textDecoration: 'underline'
                            }}
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;