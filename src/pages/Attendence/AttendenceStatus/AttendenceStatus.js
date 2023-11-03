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
                    <div className={style.tableBox}>
                        <div className={`${style.tableRow} ${style.tableHead}`}>
                            <div>업무일자</div>
                            <div>출근시간</div>
                            <div>퇴근시간</div>
                            <div>총근무시간</div>
                        </div>

                        <div className={style.tableRow}>
                            <div>2023-10-27</div>
                            <div>08:50</div>
                            <div>17:50</div>
                            <div>8</div>
                        </div>
                        <div className={style.tableRow}>
                            <div>2023-10-26</div>
                            <div>08:50</div>
                            <div>17:50</div>
                            <div>8</div>
                        </div>
                        <div className={style.tableRow}>
                            <div>2023-10-25</div>
                            <div>08:50</div>
                            <div>17:50</div>
                            <div>8</div>
                        </div>
                        <div className={style.tableRow}>
                            <div>2023-10-24</div>
                            <div>08:50</div>
                            <div>17:50</div>
                            <div>8</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendenceStatus;