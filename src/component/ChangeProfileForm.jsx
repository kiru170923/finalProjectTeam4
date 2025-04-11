import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { updateProfileInformation } from '../service/update';
import { ThemeContext } from '../App';
import { uploadImageAndGetUrl } from './UpImageToFireBase';

const EditProfileModal = () => {
    const [show, setShow] = useState(false);
    let currentUser = JSON.parse(localStorage.getItem('user'));
    const [accountInfo, setAccountInfo] = useState(currentUser);
    const { setReload } = useContext(ThemeContext);
    const [image,setImage ] = useState('')

    function updateProfile(e, imge) {
        setAccountInfo((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value, img : imge? imge : null
            };
        });
    }
    console.log(accountInfo);

   async function setUpdateProfile() {
       await updateProfileInformation(accountInfo).then(res => {
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Update successful!");
            setShow(false);
            setAccountInfo(res.user)
            setReload((pre) => !pre);
            localStorage.setItem("user", JSON.stringify(res.user));
        });
    }
    async function handleImage(e) {
        const file = e.target.files[0];
        if (!file) return;
    
        try {
            const imageUrl = await uploadImageAndGetUrl(file);
            setImage(imageUrl);
            updateProfile({ target: { name: 'image', value: imageUrl } });
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setShow(true)}
                style={{
                    backgroundColor: '#4DA8CC', 
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 20px',
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
                <i className="bi bi-pencil-square me-1"></i> Edit Profile
            </Button>

            <Modal 
                show={show} 
                onHide={() => setShow(false)} 
                centered
                style={{ 
                    '--bs-modal-bg': '#E6F3FA',
                    '--bs-modal-border-color': '#B3D9E6', 
                }}
            >
                <Modal.Header 
                    closeButton 
                    style={{ 
                        backgroundColor: '#B3D9E6', 
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
                        backgroundColor: '#F0F8FC', 
                        padding: '20px' 
                    }}
                >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#4DA8CC', fontWeight: '500' }}>Username</Form.Label>
                            <Form.Control 
                                required
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
                            required
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
                            required
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
    required
    onChange={handleImage}
    name='image'
    type="file"
    accept='image/*'
    style={{
        borderColor: '#80C4DE',
        borderRadius: '8px',
        backgroundColor: 'white',
        transition: 'border-color 0.3s',
    }}
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