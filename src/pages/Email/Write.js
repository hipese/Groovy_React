import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Write.module.css';
import axios from 'axios';
import { LoginContext } from '../../App';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import Org_Chart from '../Org_Chart/components/Org_Chart_Modal/Org_Chart';

function Write() {
  const [mail, setMail] = useState({});
  const [files, setFiles] = useState([]);
  const navi = useNavigate();
  const { loginID } = useContext(LoginContext);

  const [open, setOpen] = React.useState(true);

  // 모달을 키거나 끌때 필요한 놈
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectMemberdetail, setSelectMemberdetail] = useState({}); //선택한 직원에 상새정보를 가져옵니다.
  const [approver, setApprover] = useState({}); //승인자의 정보을 저장하는 useState 
  const [isSend, setIsSend] = useState(); //결재시 직급을 비교하여 선택할 수 있는 인원에 제한을 준다.
  const isSign = false;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };


  const handleClick = () => {
    setOpen(!open);
  };

  const handleBack = () => {
    navi(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail(prev => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(Array.from(selectedFiles));
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append('sender', loginID);
    formData.append('receipient', approver.id);
    formData.append('title', mail.title);
    formData.append('contents', mail.contents);

    files.forEach((file) => {
      formData.append(`files`, file);
    });

    axios.post('/api/mails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(resp => {
        navi('/groovy/mail');
      })
      .catch(e => {
        console.error(e);
      });
  }

  return (
    <div className="mailContainer">
      <div className={style.write}>메일 작성</div>
      <hr></hr>
      <div className={style.margin}>

        <div className={style.receipientmember}>
          <div className={style.inputdiv}>
            받는 사람
            <input type="text" placeholder="받는 사람" name="receipient" onChange={handleChange} value={approver.name || ''}  className={style.receipient} /><br />
          </div>

          <div className={style.btndiv}>
            <button onClick={toggleModal} className={style.selectbtn}>직원 검색</button>
            <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover}
              selectMemberdetail={selectMemberdetail} setSelectMemberdetail={setSelectMemberdetail} isSend={isSend} setIsSend={setIsSend} isSign={isSign} />
          </div>

        </div>

        <hr></hr>
        제목
        <input type="text" placeholder="제목" name="title" onChange={handleChange} value={mail.title || ''} className={style.title} /><br />
        <hr></hr>

        <div className={style.fileList}>
          파일 첨부
          <Button
            sx={{ width: '10%', marginLeft: '29px' }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <input
              type="file"
              onChange={handleFileChange}
              className={style.file}
              style={{ display: 'none' }}
              multiple
            />
          </Button>
          <List
            sx={{ width: '50%', bgcolor: 'background.paper', marginLeft: "30px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="업로드 파일 목록" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {files.length > 0 && (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          {files.map((file, index) => (
                            <ListItemButton key={index} sx={{ pl: 4 }}>
                              <ListItemText primary={file.name} />
                            </ListItemButton>
                          ))}
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                )}
              </List>
            </Collapse>
          </List>
        </div>
        <hr></hr>
        <div className={style.contents}>
          <textarea
            placeholder="내용을 입력하세요."
            onChange={handleChange}
            name="contents"
            value={mail.contents}
          ></textarea>
        </div>
        <hr></hr>
        <div className={style.btn}>
          <button onClick={handleBack}>취소</button>
          <button onClick={handleAdd}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Write;
