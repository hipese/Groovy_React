import DocumentList from "../../Components/Table/DocumentList";
import style from "./AttendenceMain.module.css";

const AttendenceMain = () => {
    return (
        <><div className={style.header}>
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
                <div className={style.titleText}>승인된 문서</div>
                <div className={style.text}>승인된 문서 11건이 있습니다.</div>
                <DocumentList />
            </div><div className={style.documents3}>
                <div className={style.titleText}>진행중인 문서</div>
                <div className={style.text}>승인할 문서 11건이 있습니다.</div>
                <DocumentList />
            </div></>
    );
}

export default AttendenceMain;
