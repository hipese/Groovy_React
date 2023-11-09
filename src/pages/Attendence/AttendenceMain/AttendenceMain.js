import { useEffect, useState } from "react";
import DocumentList from "../../Components/Table/DocumentList";
import style from "./AttendenceMain.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AttendenceMain = () => {

    const [vacation_complete_list, setVacation_complete_list] = useState([]);
    const [vacation_wait_list, setVacation_wait_list] = useState([]);

    useEffect(() => {
        axios.get("/api/signlist/vacation_complete").then((resp) => {
            setVacation_complete_list(resp.data);
        });

        axios.get("/api/signlist/vacation_wait").then((resp1) => {
            setVacation_wait_list(resp1.data);
        });
    }, []);

    return (
        <div>
            <div className={style.header}>
                근태관리 홈
                <hr />
            </div><div className={style.documents1}>
                <div className={style.titleText}>내 연차 내역</div>
                <div className={style.vacationStatus}>
                    <div className={style.name}>
                        <div>김민아 과장</div>
                        <div>마케팅팀</div>
                    </div>
                    <div className={style.all}>
                        <div>총연차</div>
                        <div>15일</div>
                    </div>
                    <div className={style.use}>
                        <div>사용연차</div>
                        <div>9.5일</div>
                    </div>
                    <div className={style.left}>
                        <div>잔여연차</div>
                        <div>5.5일</div>
                    </div>
                </div>
            </div><div className={style.documents2}>
                <div className={style.titleText}>휴가신청 완료</div>
                <div className={style.text}>{`완료된 문서가 ${vacation_complete_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>승인여부</div>
                </div>

                {vacation_complete_list.slice(0, 3).map((e, i) => {
                    return (
                        <div className={style.tableRow} key={i}>
                            <div>{e.seq}</div>
                            <div>{e.write_date}</div>
                            <div>{e.document_type}</div>
                            <div>{e.writer}</div>
                            <div className={style.titleContainer}>
                                <Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link>
                            </div>
                            <div>{e.accept === 0 ? "승인" : e.accept === 1 ? "미승인" : e.accept === 2 ? "반려" : "알 수 없음"}</div>
                        </div>
                    );
                })}
            </div><div className={style.documents3}>
                <div className={style.titleText}>휴가신청 진행중</div>
                <div className={style.text}>{`진행중 문서가 ${vacation_wait_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>결제자</div>
                </div>

                {vacation_wait_list.slice(0, 3).map((e, i) => {
                    return (
                        <div className={style.tableRow} key={i}>
                            <div>{e.seq}</div>
                            <div>{e.write_date}</div>
                            <div>{e.document_type}</div>
                            <div>{e.writer}</div>
                            <div className={style.titleContainer}>
                                <Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link>
                            </div>
                            <div>{e.recipient}</div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}

export default AttendenceMain;
