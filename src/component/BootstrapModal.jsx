import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {createNewArticle} from "../service/articles"
import toast from "react-hot-toast";
import { useNavigate , Link, useParams} from "react-router-dom";
import { ThemeContext } from "../App";
import { Editor } from '@tinymce/tinymce-react';
import { set } from "date-fns";
import {uploadImageAndGetUrl} from '../component/UpImageToFireBase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';


/**
 * Component này để hiển thị một cái icon và khi người dùng nhấp
 * vào thì sẽ hiển thị cái icon đó
 * @param {*} param0 
 * @returns A template để handle data cho article
 */
const BootstrapModal = ({setArticles, articles, setReload}) => {
  const {create} = useParams();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const [submit,setSubmit] = useState(false);
  const [imageList, setImageList] = useState([])
  const [loading, setLoading] = useState(false)
  const [responseArticleSlug, setResponseArticleSlug] = useState(null)

  const [articleData, setArticleData] = useState({
    article: {
      title: '',
      description: '',
      body: '',
      tagList: ''
    }
  });
  const currentUser = JSON.parse(localStorage.getItem('user')); // lấy data ng dùng htai


  //nếu tạo bài viết = cách nhấn vào nút thì sẽ set show= true để hiển thị template
  useEffect(() => {
    if (create) {
      setShow(true);
    }
  }, [create]);
  
  const {isLogin, setIsLogin} = useContext(ThemeContext);


  //lưu dữ liệu của người dùng mỗi khi sự kiện onchange trên từng 
  // input field xảy ra, tagList mặc định sẽ là "Mai"
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      article: {
        ...prevState?.article,
        [name]: value, tagList: "Mai"
      }
    }));
  };

  //tải dữ liệu lên api nếu nhấp lưu
  useEffect(()=>{
    if(submit){
      createNewArticle(articleData).then((res)=>{
        toast.success("Đăng bài thành công !");
        setResponseArticleSlug(res.article.slug)
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
  // useEffect(()=>{
  //   const q = query(collection(db, ))

  // }, [])
  async function sendNewArticle (){

    createNewArticle(articleData).then((res)=>{
      toast.success("Đăng bài thành công !");
        addDoc(collection(db, 'articlesImage'), {
        slug: res.article.slug,
        image: imageList,
        timestamp: serverTimestamp()
        
      });
      setImageList([]);
      setReload((pre) => !pre);
      nav('/home');
      setSubmit(false);
    })
    
  }

  
   async function handleImage(e){
      const files = e.target.files;
      if(!files) return; 
      setLoading(true);
      try{
        for(const file of files){
          const imageUrl = await uploadImageAndGetUrl(file); //tải ẳh lên firestore rồi lấy link ze
        setImageList((pre) => [...pre, imageUrl]);
        }
        
      }catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    }

  
  return (
    <div>
      <div className='row d-flex justify-content-center align-items-center mb-4' >
                          {isLogin ? (
                              <div className='col-7 d-flex justify-content-center align-items-center first-title p-3 rounded' 
                                   style={{ backgroundColor: '#ffffff' }}  onClick={()=>openTab()}>
                                  {/* <img src={currentUser?.image} style={{ width: '60px',height:'60px', borderRadius:'50%' }} onClick={(e) => e.stopPropagation()}  /> */}
                                  <div title="Đăng 1 bài viết mới" className="post-button" style={{position:'absolute'}}></div>
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
        <Modal.Header >
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
                value={articleData?.article?.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mô tả..."
                name="description"
                value={articleData?.article?.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="file"
                placeholder="Chọn ảnh..."
                name="description"
                multiple
                onChange={(e) => handleImage(e)}
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


              {/* Cái này là tích hợp thư viện texteditor tinymce*/}
               <Editor
               value={articleData?.article?.body}
               onEditorChange={(content) => {
                 setArticleData((prevState) => ({
                  ...prevState,
                   article: {
                    ...prevState?.article,
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
        {loading? <></>:<Button onClick={()=>{ sendNewArticle(); setShow(false); create? nav('/home'): <></> }} variant="primary">Đăng</Button> }  
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BootstrapModal;
