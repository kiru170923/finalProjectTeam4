import { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ThemeContext } from '../App';
import '../Style/Chat.css';

import React from 'react';

const PrivateChat = () => {
    return (
        <div>
            
        </div>
    );
};

export default PrivateChat;