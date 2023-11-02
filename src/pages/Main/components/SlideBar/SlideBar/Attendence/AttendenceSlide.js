import style from "./AttendenceSlide.module.css";

const AttendenceSlide = () => {
    return (
        <div className={style.AttendenceSlide}>
           <div className={style.btndiv}>
                <button className={style.writeBtn}><strong>홈</strong></button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>근태관리 홈</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>연차신청하기</button>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>출퇴근현황</button>
            </div>

        </div>
    );
};

export default AttendenceSlide;