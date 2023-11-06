import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Write.module.css';
import axios from 'axios';
import ReactQuill from './ReactQuill';

function Write() {
  const [board, setBoard] = useState({ title: '', writer: '', contents: '' });
  const [file, setFile] = useState(null); // 파일을 state로 관리
  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard(prev => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // 파일 선택 시 state 업데이트
  }

  const handleAdd = (isTemp) => {
    if (isTemp) {
      // 임시 저장 버튼을 눌렀을 때의 동작
      // 메시지 객체를 서버로 전송하고, 서버에서 임시 저장 로직을 처리합니다.
    } else {

      const formData = new FormData();
      formData.append('title', board.title);
      formData.append('contents', board.contents);
      formData.append('files', file); // 파일 추가

      axios.post('/api/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(resp => {
          navi('/groovy/board');
          console.log(resp.data);
        })
        .catch(e => {
          // 오류 처리
          console.error(e);
        });
    }
  }

  return (
    <div className="boardContainer">
      <div className={style.margin}>글쓰기</div>
      <hr></hr>
      <div className={style.margin}>
        제목
        <input type="text" placeholder="제목" name="title" onChange={handleChange} value={board.title} /><br />
        <hr></hr>
        파일 첨부
        <input type="file" onChange={handleFileChange} /><br /> {/* 파일 입력을 처리하는 부분 */}
        <hr></hr>
      </div>
      <hr></hr>
      <div className={style.editor}>
        <ReactQuill
          id="editor"
          value={board.contents}
          setValue={(value) => setBoard({ ...board, contents: value })}
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
