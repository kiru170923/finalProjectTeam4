import { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ThemeContext } from '../App';
import '../Style/Chat.css';
import { uploadImageAndGetUrl } from '../component/UpImageToFireBase';
import { Link } from 'react-router-dom';
import { getArticlesFromUsersYouFollowed } from '../service/articles';
import {deleteMessage} from '../service/firebase'

function RealTimeChat() {
  const [userData, setUserData] = useState(null);
  const [globalMessages, setGlobalMessages] = useState([]);
  const [privateMessage, setPrivateMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const endOfMessagesRef = useRef(null);
  const { isLogin } = useContext(ThemeContext);
  const [option, setOption] = useState('global');
  const [image, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [useFollow, setUserFollow] = useState([]);
  const token = localStorage.getItem('token');
  const [friendData, setFriendData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoverId,setHoverId   ] = useState(null);
  
  

  //lấy user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  //cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [globalMessages, privateMessage]);

  //tạo tên collection trên firebase = tên của 2 người, sắp xếp theo a - z
  function setRoomName(friend) {
    if (!friend || !userData) return '';
    const usernames = [friend.username, userData.username];
    usernames.sort();
    return usernames.join('_');
  }

  function changeChatOption(chatType) {
    setOption(chatType);
  }

  useEffect(() => {
    if (option === 'global') {
      const q = query(collection(db, 'globalMessages'), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, snapshot => {
        setGlobalMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })));
      });
      return () => unsubscribe();
    }
    if (option === 'private' && friendData) {
      const q = query(collection(db, setRoomName(friendData)), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, snapshot => {
        setPrivateMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })));
      });
      return () => unsubscribe();
    }
  }, [option, friendData]);

  //gửi tin nhắn
  const sendMessage = async () => {
    if (loading) return;
    if (!newMessage.trim() && !image.trim() || !userData) return; // rỗng thì ko gửi, thoát luôn

    //gửi tin nhắn khi chat global
    if (option === 'global') {
      await addDoc(collection(db, 'globalMessages'), {
        uid: userData.username,
        displayName: userData.username,
        photoURL: userData.image,
        image: image,
        text: newMessage,
        timestamp: serverTimestamp(),
      });
    }
    //gửi tin nhắn ở private
    else if (option === 'private' && friendData) {
      await addDoc(collection(db, setRoomName(friendData)), {
        uid: userData.username,
        displayName: userData.username,
        photoURL: userData.image,
        image: image,
        text: newMessage,
        timestamp: serverTimestamp(),
      });
    }
    setNewMessage('');
    setNewImage('');
  };

  //kích hoạt gửi tin nhắn khi nhấp enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  //xử lý ảnh tải lên.
  async function handleImage(e) {
    const file = e.target.files[0]; // láy ảnh 1
    if (!file) return; // ko có file thì ko tải
    setLoading(true);
    try {
      const imageUrl = await uploadImageAndGetUrl(file); //tải ẳh lên firestore rồi lấy link ze
      setNewImage(imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function setChoosen(index) {
    setSelectedIndex(index); // xác định index của user mình định nhắn để chuyển màu hội thoại
  }

  useEffect(() => {
    getArticlesFromUsersYouFollowed(token).then(res => {
      const authors = res?.articles.map(article => article.author);
      const uniqueAuthors = authors.filter(
        (author, index, self) =>
          index === self.findIndex(a => a?.username === author?.username)
      );
      setUserFollow(uniqueAuthors);
    });
  }, [token]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <Link to="/home" className="back-button" title="Quay lại"></Link>
        <h1>Chat Application</h1>
        <div className="chat-tabs">
          <button
            className={`tab-button ${option === 'global' ? 'active' : ''}`}
            onClick={() => changeChatOption('global')}
            title="Chat tổng"
          >
            Global
          </button>
          <button
            className={`tab-button ${option === 'private' ? 'active' : ''}`}
            onClick={() => changeChatOption('private')}
            title="Chat với bạn bè đã theo dõi"
          >
            Private
          </button>
        </div>
      </header>

      <main className="chat-main">
        {option === 'private' && (
          <aside className="friends-sidebar">
            <div className="friends-list">
              {useFollow.length > 0 ? (
                useFollow.map((user, index) => (
                  <div
                    key={index}
                    className={`friend-item ${selectedIndex === index ? 'selected' : ''}`}
                    onClick={() => {
                      setFriendData(user);
                      setChoosen(index);
                    }}
                  >
                    <img src={user.image} alt={user.username} className="friend-avatar" />
                    <div className="friend-info">
                      <h3>{user.username}</h3>
                      <p>{user.bio?.substring(0, 20) || 'No bio'}...</p>
                    </div>
                    <span className="friend-status"></span>
                  </div>
                ))
              ) : (
                <div className="no-friends">No friends to chat with.</div>
              )}
            </div>
          </aside>
        )}

        <section className={`chat-area ${option === 'private' ? 'with-sidebar' : ''}`}>
          <div className="messages">
            {(option === 'global' ? globalMessages : privateMessage).map((msg) => {
              const isCurrentUser = msg.data.uid === userData?.username;
              const displayName = msg.data.displayName;
              const image = msg.data.image;
              const photoURL = msg.data.photoURL || 'default-avatar.png';
              const timestamp =
                msg.data.timestamp?.toDate().toLocaleString() || 'Just now';

              return (
                <div
                
                 style={{width: option === 'global' ? '95vw': ''}}
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
                  
                  <div className="message-bubble"
                    onMouseEnter={()=>setHoverId(msg.id)}
                    onMouseLeave={()=>setHoverId(null)}
                    >
                    
                    
                    
                    {!isCurrentUser && (
                      <span className="message-sender">{displayName}</span>
                    )}
                    <div className='d-flex gap-2'>
                    {msg.data.text && <p>{msg.data.text}</p>}  
                    </div>
                    <div style={{display: 'flex', flexDirection:'column', position:'relative'}}>
                    {isCurrentUser && hoverId === msg.id && <div style={{left:"100%", top:'100%'}} className='delete-button'  onClick={()=> deleteMessage(msg.id)}>Delete</div>}
                    {image && (
                      <a href={image} target="_blank" rel="noopener noreferrer">
                        <img src={image} alt="" className="message-image" />
                      </a>
                    )}
                    <span className="message-time">{timestamp}</span>
                    </div>
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

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              title="Nhập tin nhắn để gửi"
            />
            <div className="input-actions">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e)}
                disabled={loading}
                style={{ display: 'none' }}
              />
              <label
                htmlFor="imageUpload"
                className={`action-button image-upload ${loading ? 'disabled' : ''}`}
                title="Chọn ảnh để gửi"
              ></label>
              <button
                onClick={sendMessage}
                className={`action-button send ${loading ? 'disabled' : ''}`}
                disabled={loading}
                title="Gửi tin nhắn"
              ></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RealTimeChat;