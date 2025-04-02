import React, { useEffect, useState } from 'react';
import { setUser } from '../service/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    
    // get new user information from input
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
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="d-flex flex-column align-items-center" style={{ marginTop: '-30vh' }}>
                <h2>Sign Up</h2>
                <input
                    required
                    onChange={setAccountInformation}
                    type="text"
                    className="form-control mb-3"
                    name="username"
                    placeholder="Enter Username..."
                    style={{ width: '500px', padding: '8px', fontSize: '14px' }}
                />
                <input
                    required
                    onChange={setAccountInformation}
                    type="text"
                    className="form-control mb-3"
                    name="email"
                    placeholder="Enter Email..."
                    style={{ width: '500px', padding: '8px', fontSize: '14px' }}
                />
                <input
                    required
                    onChange={setAccountInformation}
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    placeholder="Enter Password..."
                    style={{ width: '500px', padding: '8px', fontSize: '14px' }}
                />
                <div>
                    <button
                        type="button"
                        onClick={() => setSignup(true)}
                        className="btn btn-dark"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
