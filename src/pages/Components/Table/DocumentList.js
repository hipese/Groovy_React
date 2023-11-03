
import style from "./DocumentList.module.css"
import { Link } from 'react-router-dom';



const DocumentList = () => {
    return (
        <div className={style.tableBox}>
            <div className={`${style.tableRow} ${style.tableHead}`}>
                <div>문서번호</div>
                <div>기안일</div>
                <div>결제양식</div>
                <div>기안자</div>
                <div>제목</div>
                <div>첨부</div>
            </div>

            <div className={style.tableRow}>
                <div>2023</div>
                <div>2023-10-24</div>
                <div>품의서</div>
                <div><Link to={`detail`}>안성진</Link></div>
                <div>휴가 신청</div>
                <div>파일 아이콘</div>
            </div>
        </div>
    );
}

export default DocumentList;