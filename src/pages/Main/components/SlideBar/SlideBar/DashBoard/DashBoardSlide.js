import style from "./DashBoardSlide.module.css";

const DashBoardSlide = () => {
    return (
        <div className={style.DashBoardSlide}>
            <button className={style.btn}>
            <strong>+</strong> 개요보기
          </button>
        </div>
    );
};

export default DashBoardSlide;