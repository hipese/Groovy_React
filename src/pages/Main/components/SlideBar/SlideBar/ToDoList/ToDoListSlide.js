import style from "../SlideBar.module.css";
import { Link, Route, Routes } from "react-router-dom";

const ToDoListSlide = () => {
    return (
        <div className={style.ToDoListSlide}>
            <Link to="">
                <button className={style.btn}>
                    <strong>+</strong> 일정
                </button>
            </Link>
            <Link to="ToDoListBoard">
                <button className={style.btn}>
                    <strong>+</strong> 내 보드
                </button>
            </Link>
            <Link to="ToDoListCalendar">
                <button className={style.btn}>
                    <strong>+</strong> 캘린더
                </button>
            </Link>
            <Link to="ToDoListTeam">
                <button className={style.btn}>
                    <strong>+</strong> 팀 보드
                </button>
            </Link>
        </div>
    );
};

export default ToDoListSlide;