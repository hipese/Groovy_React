import { Link } from "react-router-dom";
import style from "./Sign_Progress.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const Sign_Progress = () => {

    const [sign_list, setSign_list] = useState([]);

    useEffect(() => {
        axios.get("/api/signlist").then(resp => {
            setSign_list(resp.data);
        });
    }, []);


    return (
        <div className={style.sign_container}>
            <div className={style.header}>
                결제진행중
                <hr />
            </div>
            <div className={style.documents}>
                <div className={style.titleText}>결제 진행중인 문서</div>
                <div className={style.text}>진행중 문서가 11건이 있습니다.</div>
                <div className={`${style.tableRow} ${style.tableHead}`}>
                    <div>문서번호</div>
                    <div>기안일</div>
                    <div>결제양식</div>
                    <div>기안자</div>
                    <div>제목</div>
                    <div>첨부</div>
                </div>

                {sign_list.map((e, i) => {
                    return (
                        <div className={style.tableRow}>
                        <div>{e.seq}</div>
                        <div>{e.write_date}</div>
                        <div>{e.document_type}</div>
                        <div>{e.writer}</div>
                        <div><Link to={`/Groovy/signlist/detail`}>{e.title}</Link></div>
                        <div>파일 아이콘</div>
                    </div>
                    );
                })}

              
            </div>
        </div>
    );
}
export default Sign_Progress;