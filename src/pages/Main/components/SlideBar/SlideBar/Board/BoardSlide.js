import style from "./BoardSlide.module.css";

const BoardSlide = () => {
    return (
        <div className={style.BoardSlide}>
            <button className={style.btn}>
            <strong>+</strong> 작성하기
          </button>
        </div>
    );
};

export default BoardSlide;