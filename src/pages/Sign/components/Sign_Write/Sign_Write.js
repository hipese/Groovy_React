import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Sign_Write.module.css";
import { Link, useNavigate } from "react-router-dom";
import Org_Chart from '../../../Org_Chart/components/Org_Chart_Modal/Org_Chart';
import axios from 'axios';
import { LoginContext } from "../../../../App";
import { useWebSocket } from "../../../../WebSocketContext/WebSocketContext";


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

    const stompClient = useWebSocket();
    const { loginID } = useContext(LoginContext);
    // 모달을 키거나 끌때 필요한 놈
    const [isModalOpen, setModalOpen] = useState(false);

    const navi = useNavigate();
    const [contents, setContents] = useState("");
    const [document_type, setDocument_type] = useState("품의서");
    const [title, setTitle] = useState("");
    const [approver, setApprover] = useState({}); //승인자의 정보을 저장하는 useState 
    const [accept] = useState(1);
    const [comment] = useState("");
    const [formdata, setFormData] = useState({
        files: []
    });


    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };


    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, files: [...e.target.files] }))
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

        if(!title){
            alert("제목을 입력해주세요");
            return;
        }

        if(!contents){
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
            .then(resp => {
                navi("/Groovy/signlist");
            })
            .catch(e => {
                console.error(e);
            });

        if (stompClient) {
            const message = "전자결제가 도착했습니다.";
            const messageObject = { message, recipient: approver.id };
            stompClient.send("/app/notice", {}, JSON.stringify(messageObject));
        }
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
                    <div className={style.label}>
                        문서종류
                    </div>
                    <div className={style.dropbox}>
                        <select name="doc" onChange={(e) => setDocument_type(e.target.value)}>
                            <option value="품의서">품의서</option>
                            <option value="휴가신청서">휴가신청서</option>
                        </select>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.writer}>
                            기안작성자
                        </div>
                        <div className={style.name}>
                            {`${loginID}`}
                        </div>
                    </div>
                </div>
                <div className={style.signline}>
                    <div className={style.titleText}>
                        <div className={style.textDiv}> 
                            결제선 지정
                        </div>
                        <div className={style.buttonDiv}>
                            <button onClick={toggleModal} className={style.btn}>조직도 검색</button>
                            <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover} />
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
                                    {approver.name ? approver.name : "맴버을 선택하세요"}
                                </div>
                            </div>
                            <div className={style.tableRow}>
                                <div>부서</div>
                                <div>
                                    {approver.group_name ? approver.group_name : "부서을 선택하세요"}
                                </div>
                            </div>
                            <div className={style.tableRow}>
                                <div>직급</div>
                                <div>
                                    {approver.position ? approver.position : "직급을 선택하세요"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.signwrite}>
                    <div className={style.title}>결제 작성</div>
                    <div className={style.tableBox}>
                        <div className={`${style.writeRow} ${style.writeHead}`}>
                            <div>기안부서</div>
                            <div>마케팅</div>
                            <div>기안일</div>
                            <div>2023-11-03</div>
                            <div>기안문서</div>
                            <div>자동설정</div>
                        </div>
                        <div className={style.titleRow}>
                            <div>제목</div>
                            <div>
                                <input
                                    type="text"
                                    style={{ width: '100%' }}
                                    placeholder="제목입력"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="textEditor">
                        <ReactQuill
                            style={{ height: "200px", width: "1000px" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={contents} // 내용을 contents 상태로 설정
                            onChange={handleContentChange} // 내용이 변경될 때 호출할 핸들러
                        />
                    </div>
                </div>
                <div className={style.fileRow}>
                    <div>파일첨부</div>
                    <div><input type="file" onChange={handleFileChange} multiple></input></div>
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