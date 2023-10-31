import style from "./ToDoListSlide.module.css";

const ToDoListSlide = () => {
    return (
        <div className={style.ToDoListSlide}>
            <button className={style.btn}>
            <strong>+</strong> 일정 작성하기
          </button>
        </div>
    );
};

export default ToDoListSlide;