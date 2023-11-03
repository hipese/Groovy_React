import ReactQuill from "react-quill";
import style from "./Sign_Detail.module.css";

const Sign_Detail = () => {

    return (
        <div>
            <div className={style.header}>
                문서 상세보기
                <hr />
            </div>
            <div className={style.documents1}>
                <div className={style.top}>
                    <div className={style.leftContainer}>
                        <div className={style.docType}>
                            <div className={style.left}>
                                문서종류
                            </div>
                            <div className={style.right}>
                                휴가신청서
                            </div>
                        </div>
                        <div className={style.docWriter}>
                            <div className={style.left}>
                                기안자
                            </div>
                            <div className={style.right}>
                                안성진
                            </div>
                        </div> <div className={style.docDepartment}>
                            <div className={style.left}>
                                소속
                            </div>
                            <div className={style.right}>
                                Git관리부
                            </div>
                        </div> <div className={style.docWrite_Date}>
                            <div className={style.left}>
                                기안작성일
                            </div>
                            <div className={style.right}>
                                2023-11-03
                            </div>
                        </div>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.docType}>
                            <div className={style.left}>
                                구분
                            </div>
                            <div className={style.right}>
                                결제자
                            </div>
                        </div>
                        <div className={style.docWriter}>
                            <div className={style.left}>
                                직급
                            </div>
                            <div className={style.right}>
                                과장
                            </div>
                        </div> <div className={style.docDepartment}>
                            <div className={style.left}>
                                이름
                            </div>
                            <div className={style.right}>
                                고재훈
                            </div>
                        </div> <div className={style.docWrite_Date}>
                            <div className={style.left}>
                                승인여부
                            </div>
                            <div className={style.right}>
                                승인
                            </div>
                        </div>
                    </div>
                    <div className={style.signwrite}>
                        <div className={style.title}>휴가신청서</div>
                        <div className={style.tableBox}>
                            <div className={`${style.writeRow} ${style.writeHead}`}>
                                <div>기안부서</div>
                                <div>GIT</div>
                                <div>기안일</div>
                                <div>2023-11-03</div>
                                <div>기안문서</div>
                                <div>자동설정</div>
                            </div>
                            <div className={style.writeRow}>
                                <div>증명서 종류</div>
                                <div>휴가신청서</div>
                                <div>용도</div>
                                <div>휴가신청</div>
                                <div>제출처</div>
                                <div>GIT</div>
                            </div>
                            <div className={style.titleRow}>
                                <div>제목</div>
                                <div>과장님 휴가좀 승인해주세요</div>
                            </div>
                            <div className={style.contents}>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                                일이 너무 힘들어요<br/>
                            </div>
                        </div>
                        <div className={style.fileList}>
                           첨부파일 나올곳
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default Sign_Detail;