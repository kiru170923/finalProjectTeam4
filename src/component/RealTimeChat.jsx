import { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ThemeContext } from '../App';
import '../Style/Chat.css';
import {uploadImageAndGetUrl} from '../component/UpImageToFireBase';
import { Link } from 'react-router-dom';
import { getArticlesFromUsersYouFollowed } from '../service/articles';
  
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
  const [friendData, setFriendata] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  //lấy user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  //cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [globalMessages, privateMessage]);

  function changeChatOption(chatType){
    setOption(chatType);
  }

  useEffect(() => {
    if(option==="global"){
      const q = query(collection(db, 'globalMessages'), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, snapshot => {
        setGlobalMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });
      return () => unsubscribe();
    }
    if(option==="private"){
      const q = query(collection(db, setRoomName(friendData)), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, snapshot => {
        setPrivateMessage(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });
      return () => unsubscribe();
    }
  }, [option,friendData ]);
  console.log(privateMessage)

  //tạo tên collection trên firebase = tên của 2 người, sắp xếp theo a - z
  function setRoomName(friendName) {
    const usernames = [friendName?.username, userData?.username];
    usernames.sort();
    return usernames.join('_'); 
  }
  

  //gửi tin nhắn
  const sendMessage = async () => {
    if(loading) return;
    if (!newMessage.trim() && !image.trim() || !userData) return; // rỗng thì ko gửi, thoát luôn

    //gửi tin nhắn khi chat global
    if(option==="global"){
      await addDoc(collection(db, 'globalMessages'), {
        uid: userData.username,
        photoURL: userData.image || '',
        displayName: userData.username,
        image: image,
        text: newMessage,
        timestamp: serverTimestamp()
      });
    }
    //gửi tin nhắn ở private
    else if(option==="private"){
      await addDoc(collection(db, setRoomName(friendData)), {
        uid: userData.username,
        photoURL: userData.image || '',
        displayName: userData.username,
        image: image,
        text: newMessage,
        timestamp: serverTimestamp()
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

  function setChoosen(index){
    setSelectedIndex(index); // xác định index của user mình định nhắn để chuyển màu hội thoại
  }

  //xử lý ảnh tải lên.
  async function handleImage(e){
    const file = e.target.files[0]; // láy ảnh 1
    if(!file) return; // ko có file thì ko tải
    setLoading(true);
    try{
      const imageUrl = await uploadImageAndGetUrl(file); //tải ẳh lên firestore rồi lấy link ze
      setNewImage(imageUrl);
    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticlesFromUsersYouFollowed(token).then(res => {
      const authors = res?.articles.map(article => article.author);
      const uniqueAuthors = authors.filter((author, index, self) =>
        index === self.findIndex(a => a?.username === author?.username)
      );
      setUserFollow(uniqueAuthors);
    });
  }, []);

  return (
    <div className="chat-app-container" style={{ overflowY: 'hidden' }}>
      <div className="chat-header row">
        <h1>Chat Application</h1>
        <div className='option_in_chat'>
          <div className='funny'>
            <div title='Chat tổng'
              className="chat-tabs active global" 
              onClick={() => changeChatOption('global')}
              style={{backgroundImage: option === "global" ? "url('/images/global.png')" : 'none'}}
            ></div>
          </div>
          <div className='funny'>
            <div 
            title='Chat với bạn bè đã theo dõi'
              className="chat-tabs active private" 
              onClick={() => changeChatOption('private')}
              style={{backgroundImage: option === "private" ? "url('/images/global.png')" : 'none'}}
            ></div>
          </div>
        </div>
      </div>

      <div className="chat-main-container">
        <div className="chat-area row"> 
          {option === 'private' && (
            <div className="col-3" style={{ 
              backgroundColor: 'white', 
              height: '100vh', 
              paddingTop: "4%",
              overflowY: 'auto',
              borderRight: '1px solid #ddd'
            }}>
              {useFollow.map((user, index) => (
                <div 
                  
                  key={index}
                  className="p-3 border-bottom"
                  style={{ cursor: 'pointer',
                    backgroundColor: selectedIndex === index? "#c6f8ff": ""
                  }}
                  onClick={(e) => {setFriendata(user); setChoosen(index) }}
                >
                  <div className="d-flex align-items-center">
                    <img 
                      src={user.image} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
                      alt={user.username}
                    />
                    <div className="ms-2">
                      <div className="fw-bold">{user.username}</div>
                      <div className="text-muted" style={{ fontSize: '0.9em' }}>
                        {user.bio?.substring(0, 20) || 'No bio'}...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className={`col-${option === 'private' ? '9' : '12'}`}>
            <div 
              className="messages-container" 
              style={{ 
                height: '650px', 
                overflowY: 'auto',
                padding: '15px'
              }}
            >
              {(option === 'global' ? globalMessages : privateMessage).map((msg) => {
                const isCurrentUser = msg.data.uid === userData?.username;
                const displayName = msg.data.displayName;
                const image = msg.data.image;
                const photoURL = msg.data.photoURL || 'default-avatar.png';
                const timestamp = msg.data.timestamp?.toDate().toLocaleString() || 'Just now';

                return (
                  <div
                    key={msg.id}
                    className={`message ${isCurrentUser ? 'sent' : 'received'} mb-3`}
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
                      {image && (
                        <div className='pt-1 d-flex justify-content-center'>
                          <a href={image} target='_blank'>
                            <img src={image} alt="" style={{maxWidth: '230px'}}/>
                          </a>
                        </div>
                      )}
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

            <div className="message-input-container d-flex align-items-center p-3 border-top">
              <input
               title='Nhập tin nhắn để gửi'
                type="text"
                className="message-input flex-grow-1 me-3"
                placeholder="Type your message..."
                style={{opacity: loading ? '0.3' : '1'}}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div title='Chọn ảnh để gửi'>
                <input
                
                  id='imageUpload'
                  style={{display: 'none'}}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e)}
                />
                <label htmlFor='imageUpload' className='image-button me-3'></label>
              </div>
              <div 
              title='Gửi tin nhắn'
                onClick={sendMessage} 
                className={`button-send ${loading ? 'disable' : ''}`}  
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundImage: 'url("/images/sendButton.png")',
                  backgroundSize: 'cover',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
    </div>
  );
}

export default RealTimeChat;