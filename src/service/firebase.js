import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from '../config/firebaseConfig';
export async function deleteMessage(messageId) {
    try {
      await deleteDoc(doc(db, "globalMessages", messageId));
      console.log("Xoá thành công");
    } catch (error) {
      console.error("Lỗi khi xoá tin nhắn:", error);
    }
  }
  