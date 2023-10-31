import style from "./AttendenceSlide.module.css";

const AttendenceSlide = () => {
    return (
        <div className={style.AttendenceSlide}>
            <button className={style.btn}>
            <strong>+</strong> 작성하기
          </button>
        </div>
    );
};

export default AttendenceSlide;