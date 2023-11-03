import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Sign_Write.module.css";

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

const Sign_Write = (props) => {

    const [quillValue, setQuillValue] = useState("");

    const handleQuillChange = (content, delta, source, editor) => {
        setQuillValue(editor.getContents());
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
                        <select name="doc">
                            <option value="품의서">품의서</option>
                            <option value="휴가신청서">휴가신청서</option>
                        </select>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.writer}>
                            기안작성자
                        </div>
                        <div className={style.name}>
                            누군가의 이름
                        </div>
                    </div>
                </div>
                <div className={style.signline}>
                    <div className={style.titleText}>결제선 지정 <button>조직도 검색</button></div>
                    <div className={style.table}>
                        <div className={style.tableBox}>
                            <div className={`${style.tableRow} ${style.tableHead}`}>
                                <div>구분</div>
                                <div>중간 결재자</div>
                                <div>최종 결재자</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>이름</div>
                                <div>조직도 검색에서 선택한 멤버</div>
                                <div>조직도 검색에서 선택한 멤버</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>부서</div>
                                <div>조직도 검색에서 선택한 부서</div>
                                <div>조직도 검색에서 선택한 부서</div>
                            </div>
                            <div className={style.tableRow}>
                                <div>직급</div>
                                <div>조직도 검색에서 선택한 직급</div>
                                <div>조직도 검색에서 선택한 직급</div>
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
                        <div className={style.writeRow}>
                            <div>증명서 종류</div>
                            <div><input type="text" style={{ width: '100%', height: "100%" }} /></div>
                            <div>용도</div>
                            <div><input type="text" style={{ width: '100%' }} /></div>
                            <div>제출처</div>
                            <div><input type="text" style={{ width: '100%' }} /></div>
                        </div>
                        <div className={style.titleRow}>
                            <div>제목</div>
                            <div><input type="text" style={{ width: '100%' }} placeholder="제목입력" /></div>
                        </div>
                    </div>
                    <div className="textEditor">
                        <ReactQuill
                            style={{ height: "200px", width: "1000px" }}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            value={quillValue || ""}
                            onChange={handleQuillChange}
                        />
                    </div>
                </div>
                <div className={style.fileRow}>
                    <div>파일첨부</div>
                    <div><input type="file"></input></div>
                </div>
                <div className={style.buttons}>
                    <button className={style.apply}>신청</button>
                    <button className={style.cancel}>취소</button>
                </div>

            </div>
        </div>


    );
};
export default Sign_Write;