import { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Sign_Write.module.css";
import { Link, useNavigate } from "react-router-dom";
import Org_Chart from '../../../Org_Chart/components/Org_Chart_Modal/Org_Chart';
import axios from 'axios';
import { LoginContext } from "../../../../App";
import { useWebSocket } from "../../../../WebSocketContext/WebSocketContext";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
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
import { MemberContext } from "../../../Groovy/Groovy";

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline'],
        ['link'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline',
    'link',
];

const Sign_Write = () => {

    const formatDate = (date) => {
        const d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    };

    const todayDate = formatDate(new Date());

    const stompClient = useWebSocket();
    const { loginID } = useContext(LoginContext);
    const members = useContext(MemberContext);

    // 모달을 키거나 끌때 필요한 놈
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectMemberdetail, setSelectMemberdetail] = useState({}); //선택한 직원에 상새정보를 가져옵니다.
    const [approver, setApprover] = useState({}); //승인자의 정보을 저장하는 useState 
    const [signWriterInfo, setSignWriterInfo] = useState({}); //사용자의 상세정보

    useEffect(() => {
        axios.get(`/api/member/signWriterInfo/${members.member.id}`).then(resp2 => {
            setSignWriterInfo(resp2.data);
        });
 
    }, []);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const navi = useNavigate();
    const [contents, setContents] = useState("");
    const [document_type, setDocument_type] = useState("품의서");
    const [title, setTitle] = useState("");
    const [accept] = useState(1);
    const [comment] = useState("");
    const [formdata, setFormData] = useState({
        files: []
    });

    const handleChange = (event) => {
        setDocument_type(event.target.value);
    };


    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, files: [...e.target.files] }))
        setOpen(true);
    }
    // const handleQuillChange = (content, delta, source, editor) => {
    //     setQuillValue(editor.getContents());
    // };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (value) => {
        setContents(value);
    };

    const handleSubmit = () => {

        //approver이 없으면 선택하라고 알려주는 경고창 띄우기
        if (Object.keys(approver).length === 0) {
            alert("결재자를 선택해주세요");
            return;
        }

        if (!title) {
            alert("제목을 입력해주세요");
            return;
        }

        if (!contents) {
            alert("내용을 입력해주세요");
            return;
        }
        const submitFormData = new FormData();

        // Append the additional data to the submitFormData object
        submitFormData.append("document_type", document_type);
        submitFormData.append("contents", contents);
        submitFormData.append("recipient", approver.id);
        submitFormData.append("accept", accept);
        submitFormData.append("comment", comment);
        submitFormData.append("title", title);

        // Append files to the submitFormData
        formdata.files.forEach(e => {
            submitFormData.append("files", e);
        });

        // Send the data to the server
        axios.post('/api/signlist', submitFormData)
            .then(response => {
                const parentSeq = response.data; // 서버에서 반환한 값으로 설정
                const message = "전자결재가 도착했습니다.";
                const messageObject = { message, recipient: approver.id, parent_seq: parentSeq };

                // Stomp를 통해 메시지 전송
                if (stompClient) {
                    stompClient.send("/app/notice", {}, JSON.stringify(messageObject));
                }

                navi("/Groovy/signlist");
            })
            .catch(error => {
                console.error(error);
            });

    };


    return (
        <div>
            <div className={style.header}>
                새 결재 진행
                <hr />
            </div>
            <div className={style.documents1}>
                <div className={style.titleText}>기본설정</div>
                <div className={style.setting}>
                    <div className={style.leftContainer}>
                        <Box sx={{ width: '200px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">문서종류</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={document_type}
                                    label="문서종류"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="품의서">품의서</MenuItem>
                                    <MenuItem value="휴가신청서">휴가신청서</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className={style.rightContainer}>
                        <TextField
                            sx={{ width: '200px' }}
                            id="outlined-read-only-input"
                            label="기안작성자"
                            value={signWriterInfo.name}
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
                <div className={style.signline}>
                    <div className={style.titleText}>
                        <div className={style.textDiv}>
                            결제선 지정
                        </div>
                        <div className={style.buttonDiv}>
                            <button onClick={toggleModal} className={style.btn}>조직도 검색</button>
                            <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover}
                                selectMemberdetail={selectMemberdetail} setSelectMemberdetail={setSelectMemberdetail} />
                        </div>
                    </div>
                    <div className={style.table}>
                        <div className={style.tableBox}>
                            <div className={`${style.tableRow} ${style.tableHead}`}>
                                <div>구분</div>
                                <div>결재자</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>이름</div>
                                <div>
                                    {approver && approver.name ? approver.name : "맴버을 선택하세요"}
                                </div>
                            </div>
                            <div className={style.tableRow}>
                                <div>부서</div>
                                <div>
                                    {approver && approver.group_name ? approver.group_name : "부서을 선택하세요"}
                                </div>
                            </div>
                            <div className={style.tableRow}>
                                <div>직급</div>
                                <div>
                                    {approver && approver.position ? approver.position : "직급을 선택하세요"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.signwrite}>
                    <div className={style.title}>결제 작성</div>
                    <div className={style.tableBox2}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold', backgroundColor: blue[200] }} align="center">기안부서</TableCell>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold' }} align="center"> {signWriterInfo && signWriterInfo.group_name ? signWriterInfo.group_name : "부서선택"}</TableCell>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold', backgroundColor: blue[200] }} align="center">기안일</TableCell>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold' }} align="center">{todayDate}</TableCell>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold', backgroundColor: blue[200] }} align="center">기안문서</TableCell>
                                        <TableCell sx={{ borderBottom: 'unset', fontSize: '20px', fontWeight: 'bold' }} align="center">{document_type}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <div className={style.titleRow}>
                            <div>제목</div>
                            <div>
                                <TextField
                                    sx={{ width: '100%' }}
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    placeholder="제목을 입력해주세요"
                                    variant="filled"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.textEditor}>
                        <ReactQuill
                            style={{ height: "100%", width: "100%" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={contents} // 내용을 contents 상태로 설정
                            onChange={handleContentChange} // 내용이 변경될 때 호출할 핸들러
                        />
                    </div>
                </div>
                <div className={style.fileRow}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Button
                            sx={{ width: '20%' }}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                multiple
                            />
                        </Button>
                        <List
                            sx={{ width: '80%', bgcolor: 'background.paper' }}
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
                                    {formdata.files.length > 0 && (
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        {formdata.files.map((file, index) => (
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
                </div>
                <div className={style.buttons}>
                    <button className={style.apply} onClick={handleSubmit}>신청</button>
                    <Link to="/Groovy/signlist"><button className={style.cancel}>취소</button></Link>
                </div>
            </div>
        </div>


    );
};
export default Sign_Write;