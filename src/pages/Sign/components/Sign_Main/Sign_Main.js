import style from "./Sign_Main.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sign_Main = () => {

    const [sign_wait_list, setSign_wait_list] = useState([]);
    const [sign_progress_list, setSign_progress_list] = useState([]);
    const [sign_complete_list, setSign_complete_list] = useState([]);
    
    useEffect(() => {
        axios.get("/api/signlist/wait").then((resp) => {
            setSign_wait_list(resp.data);
        });

        axios.get("/api/signlist").then((resp1) => {
            setSign_progress_list(resp1.data);
        });

        axios.get("/api/signlist/complete").then((resp2) => {
            setSign_complete_list(resp2.data);
        });
    }, []);

    return (

        <div className={style.sign_container}>
            <div className={style.header}>
                전자결제 홈
                <hr />
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>결제 대기중 문서</div>
                <div className={style.text}>{`승인할 문서가 ${sign_wait_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>첨부</div>
                </div>

                {sign_wait_list.slice(0, 3).map((e, i) => {
                    return (
                        <div className={style.tableRow} key={i}>
                            <div>{e.seq}</div>
                            <div>{e.write_date}</div>
                            <div>{e.document_type}</div>
                            <div>{e.writer}</div>
                            <div className={style.titleContainer}>
                                <Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link>
                            </div>
                            <div>파일 아이콘</div>
                        </div>
                    );
                })}
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>결제 진행중인 문서</div>
                <div className={style.text}>{`진행중 문서가 ${sign_progress_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>첨부</div>
                </div>

                {sign_progress_list.slice(0, 3).map((e, i) => {
                    return (
                        <div className={style.tableRow} key={i}>
                            <div>{e.seq}</div>
                            <div>{e.write_date}</div>
                            <div>{e.document_type}</div>
                            <div>{e.writer}</div>
                            <div className={style.titleContainer}>
                                <Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link>
                            </div>
                            <div>파일 아이콘</div>
                        </div>
                    );
                })}
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>완료된 문서</div>
                <div className={style.text}>{`완료된 문서가 ${sign_complete_list.length}건이 있습니다.`}</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>승인여부</div>
                </div>

                {sign_complete_list.slice(0, 3).map((e, i) => {
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
            </div>

            <div className="alert">

            </div>




        </div>
    );
}

export default Sign_Main;