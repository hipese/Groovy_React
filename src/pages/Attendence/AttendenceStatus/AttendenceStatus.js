import style from "./AttendenceStatus.module.css";

const AttendenceStatus = () => {
    return (
        <div>
            <div>
                <div className={style.header}>
                    출퇴근 현황
                    <hr />
                </div><div className={style.documents1}>
                    <div className={style.titleText}>내 출퇴근 내역</div>

                </div>
            </div>
        </div>
    );
}

export default AttendenceStatus;