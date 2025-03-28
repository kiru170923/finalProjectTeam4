import React, { useState } from 'react';
import CurrentComment from '../component/CurrentComment';
import CurrentPost from '../component/CurrentPost';

const Profile = () => {
    // set xem section nào sẽ hiển thị.
    const [section, setSection] = useState('Current Post');

    function getSection(event) {
        const selectedSection = event.target.textContent;
        setSection(selectedSection);
    }

    // Lấy ra profile hiện tại của mình. 
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="border rounded-4 p-4 shadow-sm bg-white" style={{ width: '600px' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="fw-bold mb-1">UserName</p>
                        <p className="text-muted">Kieu Dinh Doan</p>
                    </div>
                    <img style={{ width: '50px', height: '50px' }} 
                         className="rounded-circle border"
                         src="/src/assets/images/profile_logo.png" 
                         alt="Profile Logo" />
                </div>

                <div className="text-center mt-3">
                    <button className="btn btn-outline-primary px-4 fw-semibold">Edit Profile</button>
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
