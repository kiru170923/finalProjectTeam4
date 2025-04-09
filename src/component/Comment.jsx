import React, { useContext, useState } from 'react';
import { uploadImage } from '../service/uploadImage';
import { postNewComment } from '../service/comments';
import { TextField, Button } from '@mui/material';
import { ThemeContext } from '../App';
import toast from 'react-hot-toast';

const Comment = ({slug}) => {
  const {setReload, reload} = useContext(ThemeContext);
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);
  const handleSubmit = async () => {
    let imageLinks = [];

    if (files.length > 0) {
      try {
        for (let file of files) {
          const link = await uploadImage(file);
          imageLinks.push(link);
        }
      } catch (err) {
        alert('Upload lỗi: ' + err.message);
        return;
      }
    }

    const imagesMarkdown = imageLinks
      .map((link) => `![image](${link})`)
      .join('\n');

    const body = imagesMarkdown
      ? `${comment}\n${imagesMarkdown}`
      : comment;

    // await postNewComment(slug, body).then((res) => {
    //   setComment('');
    //   setFiles([]);
    // });

    await toast.promise(
       postNewComment(slug, body),{
        loading: "dang tai",
        success: () =>{
          toast.success("thành công!");
          setComment('');
          setFiles([]);
        },
        error: " Lỗi !"
      }
    )

    setReload((pre) => !pre);
  };

  window.onkeydown = function (e) {
    if(e.key == "Enter"){
      handleSubmit();
    }
  }

  return (
    <div style={{ 
      backgroundColor: '#E6F3FA', 
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #B3D9E6' 
    }}>
      <TextField
        label="Nhập bình luận"
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#80C4DE', 
            },
            '&:hover fieldset': {
              borderColor: '#4DA8CC', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4DA8CC', 
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4DA8CC',
            '&.Mui-focused': {
              color: '#4DA8CC', 
            },
          },
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      />
      <input
        type="file" 
        id="comment"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        style={{ marginTop: '10px', display: 'none' }}
      />
      <div className='mt-2'>
        <label 
          htmlFor="comment" 
          className="btn btn-light"
          style={{
            backgroundColor: '#B3D9E6', 
            color: '#4DA8CC',
            border: 'none',
            '&:hover': {
              backgroundColor: '#80C4DE', 
            }
          }}
        >
          <i className="bi bi-image"></i>
        </label>
      </div>
      <div className='text-center'>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ 
            marginTop: '10px',
            backgroundColor: '#4DA8CC', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#3D8AA6', 
            }
          }}
        >
          Gửi Comment
        </Button>
      </div>
    </div>
  );
};

export default Comment;