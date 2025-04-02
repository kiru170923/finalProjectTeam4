import React, { useEffect, useState } from "react";
import { Form, InputGroup, ListGroup, Image } from "react-bootstrap";
import {getAllArticles} from '../service/articles';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [suggestions, setSuggestions] = useState([
    
  ]);

  useEffect(() => {
    getAllArticles().then(res => {
      setSuggestions(prev => [...new Set([...prev, ...res.articles.map(article => article.author)])]);
    });
  }, []);

  if(userList){
    console.log(userList)
  }
  

  return (
    <div
      className="border rounded shadow-sm p-3 bg-white"
      style={{ width: "615px", margin: "20px auto" }}
    >
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>


      {searchTerm && (
        <ListGroup className="mt-2">
          {[...suggestions].filter((user) => (user.name)?.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
              <ListGroup.Item
                key={user.id}
                className="d-flex align-items-center p-2 border rounded shadow-sm mb-2"
                style={{ cursor: "pointer", transition: "0.3s", backgroundColor: "#fdfdfd" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fdfdfd")}
              >
                <Image
                  src={user.avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                />
                <span>{user.name}</span>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchComponent;