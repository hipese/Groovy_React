import style from "./Attendence.module.css";

const Attendence = () => {
    return (
        <div className={style.Attendence}>
            <div className={style.myVacation}>
                내 연차 내역<button className={style.applyButton}>연차 신청하기</button>
                <div>김민아 과장    총연차</div>
            </div>
        </div>
    );
}

export default Attendence;