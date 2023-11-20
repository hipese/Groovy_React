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

function Write() {
  const [mail, setMail] = useState({});
  const [files, setFiles] = useState([]);
  const navi = useNavigate();
  const { loginID } = useContext(LoginContext);

  const [open, setOpen] = React.useState(true);

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
    formData.append('receipient', mail.receipient);
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
        받는 사람
        <input type="text" placeholder="받는 사람" name="receipient" onChange={handleChange} value={mail.receipient} className={style.receipient} /><br />
        <hr></hr>
        제목
        <input type="text" placeholder="제목" name="title" onChange={handleChange} value={mail.title} className={style.title} /><br />
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
