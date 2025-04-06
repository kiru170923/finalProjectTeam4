import { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { getArticlesFromUsersYouFollowed } from '../service/articles';
import { ThemeContext } from '@emotion/react';
import '../Style/Chat.css';

function RealTimeChat() {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [globalMessages, setGlobalMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('global'); // 'global' or 'contacts'
  const [selectedContact, setSelectedContact] = useState(null);
  const endOfMessagesRef = useRef(null);
  const [contacts, setContacts] = useState([]);
  const { isLogin } = useContext(ThemeContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, globalMessages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getArticlesFromUsersYouFollowed(token).then((res) => {
      const contact = res?.articles?.map((article) => article?.author);
      setContacts(contact || []);
    });
  }, [isLogin]);

  // Load global messages
  useEffect(() => {
    const q = query(collection(db, 'globalMessages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setGlobalMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedContact) return;

    const q = query(
      collection(db, 'privateMessages'),
      where('participants', 'array-contains', userData?.username),
      orderBy('timestamp')
    );
    
    const unsubscribe = onSnapshot(q, snapshot => {
      const filteredMessages = snapshot.docs
        .map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
        .filter(msg => 
          msg.data.sender === selectedContact.username || 
          msg.data.sender === userData?.username
        );
      
      setMessages(filteredMessages);
    });
    
    return () => unsubscribe();
  }, [selectedContact, userData]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !userData) return;

    if (activeChat === 'global') {
      await addDoc(collection(db, 'globalMessages'), {
        uid: userData.username,
        photoURL: userData.image || '',
        displayName: userData.username,
        text: newMessage,
        timestamp: serverTimestamp()
      });
    } else if (selectedContact) {
      await addDoc(collection(db, 'privateMessages'), {
        sender: userData.username,
        receiver: selectedContact.username,
        participants: [userData.username, selectedContact.username],
        text: newMessage,
        photoURL: userData.image || '',
        timestamp: serverTimestamp()
      });
    }

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-app-container" style={{overflowY:'hidden'}}>
      <div className="chat-header">
        <h1>Chat Application</h1>
        <div className="chat-tabs">
          <button 
            className={`tab-button ${activeChat === 'global' ? 'active' : ''}`}
            onClick={() => setActiveChat('global')}
          >
            Global Chat
          </button>
          <button 
            className={`tab-button ${activeChat === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveChat('contacts')}
          >
            Private Chats
          </button>
        </div>
      </div>

      <div className="chat-main-container">
        {activeChat === 'contacts' && (
          <div className="contacts-sidebar">
            <div className="contacts-header">
              <h3>Your Contacts</h3>
            </div>
            <div className="contacts-list">
              {contacts.map((people, index) => (
                <div 
                  key={index} 
                  className={`contact-item ${selectedContact?.username === people.username ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedContact(people);
                    setActiveChat('contacts');
                  }}
                >
                  <img 
                    src={people.image || 'default-avatar.png'} 
                    alt={people.username}
                    className="contact-avatar"
                  />
                  <div className="contact-info">
                    <p className="contact-name">{people.username}</p>
                    <p className="contact-status">Online</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chat-area">
          <div className="messages-container">
            {(activeChat === 'global' ? globalMessages : messages).map((msg) => {
              const isCurrentUser = msg.data.uid === userData?.username || 
                                 msg.data.sender === userData?.username;
              const displayName = msg.data.displayName || msg.data.sender;
              const photoURL = msg.data.photoURL || 'default-avatar.png';
              const timestamp = msg.data.timestamp?.toDate().toLocaleString() || 'Just now';

              return (
                <div
                  key={msg.id}
                  className={`message ${isCurrentUser ? 'sent' : 'received'}`}
                >
                  {!isCurrentUser && (
                    <img
                      src={photoURL}
                      className="message-avatar"
                      alt={displayName}
                    />
                  )}
                  <div className="message-content">
                    {!isCurrentUser && (
                      <div className="message-sender">{displayName}</div>
                    )}
                    <div className="message-text">{msg.data.text}</div>
                    <div className="message-time">{timestamp}</div>
                  </div>
                  {isCurrentUser && (
                    <img
                      src={photoURL}
                      className="message-avatar"
                      alt={displayName}
                    />
                  )}
                </div>
              );
            })}
            <div ref={endOfMessagesRef}></div>
          </div>

          <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder={`Type your ${activeChat === 'global' ? 'global' : 'private'} message...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-button"
              onClick={sendMessage}
              disabled={!newMessage.trim() || (activeChat === 'contacts' && !selectedContact)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealTimeChat;