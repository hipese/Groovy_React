import style from "./Attendence.module.css";

const Attendence = () => {
    return (
        <div className={style.Attendence}>
            <div className={style.title}>내 연차 내역<button className={style.applyButton}>연차 신청하기</button></div><br />
            <div className={style.myVacation}>
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
            </div>  
        </div>
    );
}

export default Attendence;