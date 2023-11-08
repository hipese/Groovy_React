import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Write.module.css';
import axios from 'axios';
import ReactQuill from './ReactQuill';
import { LoginContext } from '../../App';

function Write() {
  const [mail, setMail] = useState({ seq: "", sender: "", receipient: "", title: "", contents: "", write_date: "" });
  const [file, setFile] = useState(null);
  const navi = useNavigate();
  const { loginID } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail(prev => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleAdd = (isTemp) => {
    if (isTemp) {
    } else {
      const formData = new FormData();
      formData.append('sender', loginID);
      formData.append('receipient', mail.receipient);
      formData.append('title', mail.title);
      formData.append('contents', mail.contents);

      if (file) {
        formData.append('files', file);
      }

      axios.post('/api/mails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(resp => {
          navi('/groovy/mail');
          console.log(resp.data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  return (
    <div className="mailContainer">
      <div className={style.write}>글쓰기</div>
      <hr></hr>
      <div className={style.margin}>
        받는 사람
        <input type="text" placeholder="받는 사람" name="receipient" onChange={handleChange} value={mail.receipient} className={style.receipient} /><br />
        <hr></hr>
        제목
        <input type="text" placeholder="제목" name="title" onChange={handleChange} value={mail.title} className={style.title} /><br />
        <hr></hr>
        파일 첨부
        <input type="file" onChange={handleFileChange} className={style.file} /><br />
        <hr></hr>
      </div>
      <hr></hr>
      <div className={style.editor}>
        <ReactQuill
          id="editor"
          value={mail.contents}
          setValue={(value) => setMail({ ...mail, contents: value })}
        />
      </div>
      <hr></hr>
      <div className={style.btn}>
        <button onClick={() => handleAdd(true)}>임시저장</button>
        <button onClick={() => handleAdd(false)}>등록</button>
      </div>
    </div>
  );
}

export default Write;
