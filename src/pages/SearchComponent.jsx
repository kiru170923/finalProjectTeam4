import React, { useEffect, useState } from "react";
import { Form, InputGroup, ListGroup, Image } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export const getAllArticles = async () => {
  try {
    const userApi = "https://node-express-conduit.appspot.com/api/articles?page=1";
    const res = await axios.get(userApi);
    return res.data.articles; 
  } catch (error) {
    console.log("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getAllArticles().then((articles) => {
      const authors = articles
        .map((article) => article.author) 
        .filter((author, index, self) => author && author.username && self.findIndex(a => a.username === author.username) === index);
      setSuggestions(authors);
    });
  }, []);

  //random
  function getRandomObjects(array, count) {
    return [...array] 
      .sort(() => Math.random() - 0.5)
      .slice(0, count); 
  }

  


  const filteredSuggestions = searchTerm
    ? suggestions.filter((author) => author.username.toLowerCase().startsWith(searchTerm.toLowerCase()))
    : [];

  return (
   <>
    <div className="border rounded shadow-sm p-3 bg-white" style={{ width: "615px", margin: "20px auto" }}>

<InputGroup className="mb-3">
  <Form.Control
    type="text"
    title="Nhập từ khoá để tìm kiếm bạn bè"
    placeholder="Tìm kiếm bạn bè..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</InputGroup>

{filteredSuggestions.length > 0 ? (
  <ListGroup className="mt-2">
    {filteredSuggestions.map((user) => (
      <ListGroup.Item onClick={()=>nav("/profile", {
        state:{
          author: user
        }
      }) }
        key={user.username}
        className="d-flex align-items-center p-2 border rounded shadow-sm mb-2"
        style={{ cursor: "pointer", transition: "0.3s", backgroundColor: "#fdfdfd" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fdfdfd")}
      >
        <Image
          src={user.image || "https://via.placeholder.com/40"}
          roundedCircle
          width={40}
          height={40}
          className="me-2"
        />
        <span>{user.username}</span>
      </ListGroup.Item>
    ))}
  </ListGroup>
): <div>
  <ListGroup className="mt-2" > 
  
      <ListGroup.Item 
       
        className="d-flex align-items-center p-2 border rounded shadow-sm mb-2"
        style={{ cursor: "pointer", transition: "0.3s", backgroundColor: "#fdfdfd" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fdfdfd")}
      >
        <Image
          src="https://via.placeholder.com/40"
          roundedCircle
          width={40}
          height={40}
          className="me-2"
        />
        <span></span>
      </ListGroup.Item>
    
  </ListGroup>
  </div>}
</div>
    <Link to={'/home'}><div title='Quay lại' className='back-button'></div></Link>
</>
  );
};

export default SearchComponent;
