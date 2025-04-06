import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { updateProfileInformation } from '../service/update';
import { ThemeContext } from '../App';

const EditProfileModal = () => {
    const [show, setShow] = useState(false);
    let currentUser = JSON.parse(localStorage.getItem('user'));
    const [accountInfo, setAccountInfo] = useState(currentUser);
    const { setReload } = useContext(ThemeContext);

    function updateProfile(e) {
        setAccountInfo((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value
            };
        });
    }
    console.log(accountInfo);

    function setUpdateProfile() {
        updateProfileInformation(accountInfo).then(res => {
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Update successful!");
            setShow(false);
            setReload((pre) => !pre);
        });
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={() => setShow(true)}
                style={{
                    backgroundColor: '#4DA8CC', // Nền xanh nhạt
                    border: 'none',
                    borderRadius: '20px', // Bo tròn mạnh
                    padding: '8px 20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
                    transition: 'background-color 0.3s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#3D8AA6'; // Hover đậm hơn
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#4DA8CC';
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <i className="bi bi-pencil-square me-1"></i> Edit Profile
            </Button>

            <Modal 
                show={show} 
                onHide={() => setShow(false)} 
                centered
                style={{ 
                    '--bs-modal-bg': '#E6F3FA', // Nền modal xanh nhạt
                    '--bs-modal-border-color': '#B3D9E6', // Viền xanh nhạt
                }}
            >
                <Modal.Header 
                    closeButton 
                    style={{ 
                        backgroundColor: '#B3D9E6', // Header xanh nhạt hơn
                        borderBottom: 'none', 
                        padding: '15px 20px' 
                    }}
                >
                    <Modal.Title 
                        style={{ 
                            color: '#4DA8CC', 
                            fontSize: '1.3rem', 
                            fontWeight: '600' 
                        }}
                    >
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body 
                    style={{ 
                        backgroundColor: '#F0F8FC', // Nội dung xanh nhạt nhã nhặn
                        padding: '20px' 
                    }}
                >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#4DA8CC', fontWeight: '500' }}>Username</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateProfile(e)} 
                                name='username' 
                                type="text" 
                                placeholder="Enter new username" 
                                value={accountInfo.username} 
                                style={{
                                    borderColor: '#80C4DE',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4DA8CC'}
                                onBlur={(e) => e.target.style.borderColor = '#80C4DE'}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#4DA8CC', fontWeight: '500' }}>Email</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateProfile(e)} 
                                name='email' 
                                type="email" 
                                placeholder="Enter new email" 
                                value={accountInfo.email} 
                                style={{
                                    borderColor: '#80C4DE',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4DA8CC'}
                                onBlur={(e) => e.target.style.borderColor = '#80C4DE'}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#4DA8CC', fontWeight: '500' }}>Bio</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateProfile(e)} 
                                name='bio' 
                                type="text" // Sửa type từ "email" thành "text" cho bio
                                placeholder="Enter new bio" 
                                value={accountInfo?.bio || ''} 
                                style={{
                                    borderColor: '#80C4DE',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4DA8CC'}
                                onBlur={(e) => e.target.style.borderColor = '#80C4DE'}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#4DA8CC', fontWeight: '500' }}>Image</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateProfile(e)} 
                                name='image' 
                                type="text" // Sửa type từ "email" thành "text" cho URL hình ảnh
                                placeholder="Enter new image URL" 
                                value={accountInfo.image} 
                                style={{
                                    borderColor: '#80C4DE',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4DA8CC'}
                                onBlur={(e) => e.target.style.borderColor = '#80C4DE'}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer 
                    style={{ 
                        backgroundColor: '#E6F3FA', 
                        borderTop: 'none', 
                        padding: '15px 20px' 
                    }}
                >
                    <Button 
                        variant="secondary" 
                        onClick={() => setShow(false)}
                        style={{
                            backgroundColor: '#B3D9E6',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 16px',
                            color: '#4DA8CC',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#80C4DE'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#B3D9E6'}
                    >
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => setUpdateProfile()}
                        style={{
                            backgroundColor: '#4DA8CC',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 16px',
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditProfileModal;