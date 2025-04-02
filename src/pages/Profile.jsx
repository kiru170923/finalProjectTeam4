import React, { useContext, useEffect, useState } from 'react';
import CurrentComment from '../component/CurrentComment';
import CurrentPost from '../component/CurrentPost';
import EditProfileModal from '../component/ChangeProfileForm';
import { ThemeContext } from '../App';

const Profile = () => {
        const {reload, setReload} = useContext(ThemeContext);
        const [currentUser, setCurrentUser] = useState(null)
    
    const [section, setSection] = useState('Current Post');
   useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));//
    setCurrentUser(user)
   }, [reload])
// 

    function getSection(event) {
        const selectedSection = event.target.textContent;
        setSection(selectedSection);
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="border rounded-4 p-4 shadow-sm bg-white" style={{ width: '600px' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="fw-bold mb-1">{currentUser?.username}</p>
                        <p className="text-muted">{currentUser?.bio}</p>
                    </div>
                    <img style={{ width: '50px', height: '50px' }} 
                         className="rounded-circle border"
                         src={currentUser?.image} 
                         alt="Profile Logo" />
                </div>

                <div className="text-center mt-3">
                    <EditProfileModal/>
                </div>
                
                <hr />

                <ul className="list-unstyled d-flex justify-content-around fw-semibold text-primary"
                    style={{ cursor: 'pointer' }}>
                    <li className={section === 'Current Post' ? 'border-bottom border-3 pb-2' : ''}
                        onClick={getSection}>
                        Current Post
                    </li>
                    <li className={section === 'Current Comment' ? 'border-bottom border-3 pb-2' : ''}
                        onClick={getSection}>
                        Current Comment
                    </li>
                </ul>

                <hr />

                <div>
                    {section === 'Current Post' ? <CurrentPost /> : <CurrentComment />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
