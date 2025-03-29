import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {createNewArticle} from "../service/articles"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BootstrapModal = ({setArticles, articles}) => {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [submit,setSubmit] = useState(false);
  const [articleData, setArticleData] = useState({
    article: {
      title: '',
      description: '',
      body: '',
      tagList: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      article: {
        ...prevState.article,
        [name]: value
      }
    }));
  };
  useEffect(()=>{
    if(submit){
      createNewArticle(articleData).then((res)=>{
        setArticleData({
          article: {
            title: '',
            description: '',
            body: '',
            tagList: ''
          }
        })
        toast.success("Đăng bài thành công !");
        window.location.reload()
      })
    }
  },[submit])



  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Mở Form
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tiêu đề..."
                name="title"
                value={articleData.article.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mô tả..."
                name="description"
                value={articleData.article.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nội dung chính..."
                name="body"
                value={articleData.article.body}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên Tag..."
                name="tagList"
                value={articleData.article.tagList}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Đóng
          </Button>
          <Button onClick={()=>{setSubmit(true), setShow(false)}} variant="primary">Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BootstrapModal;
