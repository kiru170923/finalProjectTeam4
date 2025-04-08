import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {createNewArticle} from "../service/articles"
import toast from "react-hot-toast";
import { useNavigate , Link, useParams} from "react-router-dom";
import { ThemeContext } from "../App";
import { Editor } from '@tinymce/tinymce-react';
import { set } from "date-fns";

const BootstrapModal = ({setArticles, articles, setReload}) => {
  const {create} = useParams();
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
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (create) {
      setShow(true);
    }
  }, [create]);
  
  const {isLogin, setIsLogin} = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      article: {
        ...prevState.article,
        [name]: value, tagList: "Mai"
      }
    }));
  };
  useEffect(()=>{
    if(submit){
      createNewArticle(articleData).then((res)=>{
        toast.success("Đăng bài thành công !");
        setReload((pre) => !pre);
        nav('/home');
        setSubmit(false);
      })
    }
  },[submit]);

  function openTab(){
    if(isLogin){
      setShow(true);
    }
  }

  return (
    <div>
      <div className='row d-flex justify-content-center align-items-center mb-4' >
                          {isLogin ? (
                              <div className='col-7 d-flex justify-content-center align-items-center first-title p-3 rounded' 
                                   style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }}  onClick={()=>openTab()}>
                                  {/* <img src={currentUser?.image} style={{ width: '60px',height:'60px', borderRadius:'50%' }} onClick={(e) => e.stopPropagation()}  /> */}
                                  <p style={{position:'absolute'}}>Write new article !</p>
                                  <div 
    className="input-homepage border-0"
    placeholder="What's new?"
    style={{ outline: "none", border: "none", boxShadow: "none" }}
/>

                                  <div className='col-12 text-end mt-2'>
                                  
                                  </div>
                              </div>
                          ) : (
                              <div className='text-center'>
                                  <p><Link to={'/login'}>Login</Link> to share your world</p>
                                  <img src="/images/world.gif" style={{ width: '80px' }} alt="" />
                              </div>
                          )}
                      </div>

      <Modal show={show}  centered size="xl">
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
              {/* <Form.Label>Body</Form.Label>
              <Form.Control
              as="textarea" 
              cols="50"
              rows="4"
                type="text"
                placeholder="Nội dung chính..."
                name="body"
                value={articleData.article.body}
                onChange={handleChange}
              /> */}
               <Editor
               value={articleData.article.body}
               onEditorChange={(content) => {
                 setArticleData((prevState) => ({
                  ...prevState,
                   article: {
                    ...prevState.article,
                     body: content
                   }
                 }));
               }}
      apiKey='y0f3imxmaa0wqxm61c65jhugkcfy4ga379m31fkvwne16rky'
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Apr 20, 2025:
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue="Welcome to TinyMCE!"
    />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShow(false), create? nav('/home'): <></>}}>
            Đóng
          </Button>
          <Button onClick={()=>{setSubmit(true), setShow(false), create? nav('/home'): <></> }} variant="primary">Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BootstrapModal;
