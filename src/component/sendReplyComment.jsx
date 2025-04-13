import { collection,getDocs,  addDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import { db } from '../config/firebaseConfig'; 

export async function sendReplyComment( slug, commentId, replyBody, author ) {
  try {
    const replyRef = collection(db, 'articles', slug, 'comments', commentId, 'replies');
    await addDoc(replyRef, {
      body: replyBody,
      createdAt: serverTimestamp(),
      author: {
        username: author.username,
        image: author.image,
        bio: author.bio || '',
        following: author.following || false
      }
    });

    toast.success("Trả lời bình luận thành công!");
  } catch (err) {
    console.error("Lỗi gửi phản hồi:", err);
    toast.error("Có lỗi xảy ra khi gửi phản hồi!");
  }
}

export async function getRepliesForComment(slug, commentId) {
  const repliesRef = collection(db, 'articles', slug, 'comments', commentId, 'replies');
  const replySnapshot = await getDocs(repliesRef);
  const replies = replySnapshot.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }));

  return replies;
}