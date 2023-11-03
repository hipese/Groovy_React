import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorContext } from './context/EditorContext';
import style from './Write.module.css';
import axios from 'axios';
import ReactQuill from './ReactQuill';

function Write() {
  // const { editorState, setEditorState } = useEditorContext();
  const [board, setBoard] = useState({ seq: '', writer: '', board: '', write_date: '' });
  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard(prev => ({ ...prev, [name]: value }));
  }

  const handleAdd = (isTemp) => {
    // isTemporary가 true이면 임시저장, false이면 등록을 의미합니다.
    if (isTemp) {
      // 임시 저장 버튼을 눌렀을 때의 동작
      // 메시지 객체를 서버로 전송하고, 서버에서 임시 저장 로직을 처리합니다.
    } else {
      // 등록 버튼을 눌렀을 때의 동작
      // 메시지 객체를 서버로 전송하고, 서버에서 글을 등록하는 로직을 처리합니다.
    }

    axios.post('/api/boards', board)
      .then(resp => {
        navi('/');
        console.log(resp.data);
      })
      .catch(e => {
        // 오류 처리
        console.error(e);
      });
  }

  return (
    <div className="boardContainer">
      <div className={style.margin}>글쓰기</div>
      <hr></hr>
      <div className={style.margin}>
        제목
        <input type="text" placeholder="제목" name="writer" onChange={handleChange} value={board.writer} /><br />
        파일 첨부
        <input type="file" name="file" onChange={handleChange} /><br />
      </div>
      <hr></hr>
      <div className={style.editor}>
        <ReactQuill
          // value={editorState}
          // onEditorStateChange={(value) => setEditorState(value)}
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
