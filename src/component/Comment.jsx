import React, { useContext, useState } from 'react';
import { uploadImage } from '../service/uploadImage';
import { postNewComment } from '../service/comments';
import { TextField, Button } from '@mui/material';
import { ThemeContext } from '../App';

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

    await postNewComment(slug, body).then((res) => {
      setComment('');
      setFiles([]);
    });

    setReload((pre) => !pre);

  };

  window.onkeydown = function (e) {
    if(e.key == "Enter"){
      handleSubmit();
    }
  }

  return (
    <div>
      <TextField
        label="Nhập bình luận"
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="file" id = "comment"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        style={{ marginTop: '10px', display:'none' }}
      />
      <div className='mt-2'><label htmlFor="comment" className="btn btn-light">
  <i className="bi bi-image"></i>
</label></div>
      <div className='text-center'>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: '10px' }}
      >
        Gửi Comment
      </Button>
      </div>
    </div>
  );
};

export default Comment;
