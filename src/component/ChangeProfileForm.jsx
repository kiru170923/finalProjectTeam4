import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {updateProfileInformation } from '../service/update'
import { ThemeContext } from '../App';


const EditProfileModal = () => {
    const [show, setShow] = useState(false);
    let currentUser = JSON.parse(localStorage.getItem('user'));
    const [accountInfo, setAccountInfo] = useState(currentUser);
    const {setReload} = useContext(ThemeContext);
    
    function updateProfile(e){
        setAccountInfo((pre => {
            return {
                ...pre, [e.target.name ]: e.target.value
            }
        }))
    }
    console.log(accountInfo)
    function setUpdateProfile(){
        updateProfileInformation(accountInfo).then(res =>{
            localStorage.setItem("user",JSON.stringify(res.user));
            toast.success("Update successful !")
            setShow(false);
            setReload((pre) => !pre)
        })
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Edit Profile</Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e)=>updateProfile(e)} name='username' type="text" placeholder="Enter new username" value={accountInfo.username} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={(e)=>updateProfile(e)} name='email' type="email" placeholder="Enter new email" value={accountInfo.email} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control onChange={(e)=>updateProfile(e)} name='bio' type="email" placeholder="Enter new bio" value={accountInfo?.bio} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control onChange={(e)=>updateProfile(e)} name='image' type="email" placeholder="Enter new image" value={accountInfo.image} />
                        </Form.Group>
                  
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={()=>setUpdateProfile()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditProfileModal;
