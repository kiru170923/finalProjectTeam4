import React, { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV, FaPen, FaUserCircle } from "react-icons/fa";
import { InputGroup, Form, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getArticlesFromUsersYouFollowed } from "../service/articles";

const fakeArticles = [
  { id: 1, author: { name: "Anh Phan", avatar: "https://i.pravatar.cc/50?img=1", online: true } },
  { id: 2, author: { name: "Ngọc Loan", avatar: "https://i.pravatar.cc/50?img=2", online: false } },
  { id: 3, author: { name: "Nguyễn Hưng", avatar: "https://i.pravatar.cc/50?img=3", online: true } },
  { id: 4, author: { name: "Thu Trang", avatar: "", online: true } },
  { id: 5, author: { name: "Nguyễn Thái Hoàng", avatar: "", online: false } },
  { id: 6, author: { name: "Nguyễn Đình Đức", avatar: "https://i.pravatar.cc/50?img=6", online: true } },
  { id: 7, author: { name: "Tâm Nhân Trọng Nguyễn", avatar: "https://i.pravatar.cc/50?img=7", online: false } },
  { id: 8, author: { name: "Hà Thu", avatar: "", online: true } },
  { id: 9, author: { name: "Lê Huy Hoàng", avatar: "https://i.pravatar.cc/50?img=9", online: false } },
  { id: 10, author: { name: "Hùng Bùi", avatar: "https://i.pravatar.cc/50?img=10", online: true } },
  { id: 11, author: { name: "Chi Mai", avatar: "https://i.pravatar.cc/50?img=11", online: true } },
];

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setContacts(fakeArticles);
  //   }, 800);
  // }, []);


  useEffect(()=>{
    getArticlesFromUsersYouFollowed(token).then((res) =>{
      const contact = res?.articles?.map((article) => article?.author);
      setContacts(contact);
    })
  }, [])
 

  // const filteredContacts = contacts.filter(contact =>
  //   contact?.author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="d-flex flex-column position-sticky overflow-auto" style={{ width: "300px", maxHeight: "780px", backgroundColor: "#f8f9fa", top:'20px' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top">
        <h5 className="mb-0 font-weight-bold">Contacts</h5>
        <div className="d-flex">
          <FaEllipsisV className="ml-3" style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-bottom">
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search contacts..."
            value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Contacts List */}
      
      <div className="flex-grow-1 overflow-auto">
        {contacts?.length === 0 ? (
          <div className="text-center p-4 text-muted">No contacts found</div>
        ) : (
          contacts?.map((contact) => (
          
            <div
              key={contact.id}
              className="d-flex align-items-center p-3 border-bottom hover-light"
              style={{ cursor: "pointer", backgroundColor: "#fff" }}
            >
              <div className="position-relative mr-3">
                {contact.image ? (
                  <img
                    src={contact?.image}
                    alt={contact.username}
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                ) : (
                  <FaUserCircle size="40" className="text-secondary" />
                )}
                {/* {contact.author.online && (
                  <Badge
                    pill
                    bg="success"
                    className="position-absolute"
                    style={{ bottom: "0", right: "0", width: "12px", height: "12px", border: "2px solid white" }}
                  />
                )} */}
              </div>

              <div className="flex-grow-1">
                <div className="font-weight-bold text-truncate" style={{ maxWidth: "180px" }}>
                  {contact.username}
                </div>
                {/* <small className={`text-${contact.author.online ? "success" : "muted"}`}>
                  {contact.author.online ? "Online" : "Offline"}
                </small> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Message Button */}
      <button
        className="btn btn-primary rounded-circle position-absolute"
        style={{ bottom: "20px", right: "20px", width: "50px", height: "50px" }}
      >
        <FaPen />
      </button>
    </div>
  );
};

export default ContactsList;