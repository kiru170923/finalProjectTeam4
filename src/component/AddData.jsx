// AddData.jsx
import React, { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';  // Named import

const AddData = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddData = async () => {
    if (!name) {
      alert("Vui lòng nhập tên!");
      return;
    }

    setLoading(true);
    try {
      // Thêm dữ liệu vào Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        name: name,
        age : age,
        createdAt: new Date()
      });
      console.log("Dữ liệu đã được thêm vào với ID: ", docRef.id);
      alert('Dữ liệu đã được thêm thành công!');
      setName(''); // Xóa input sau khi thêm
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu: ", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(data);
  };

  fetchData()
  return (
    <div>
      <h1>Thêm Dữ Liệu</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên"
      />
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Nhập tên"
      />
      <button onClick={handleAddData} disabled={loading}>
        {loading ? 'Đang thêm...' : 'Thêm'}
      </button>
    </div>
  );
};

export default AddData;
