import style from "./ToDoListSlide.module.css";
import { Link, Route, Routes } from "react-router-dom";

import ToDoListDash from "../../../../../ToDoList/ToDoList";
import ToDoListBoard from "../../../../../ToDoList/ToDoListBoard";
import ToDoListCalendar from "../../../../../ToDoList/ToDoListCalendar";
import ToDoListTeam from "../../../../../ToDoList/ToDoListTeam";

const ToDoListSlide = () => {
    return (
        <div className={style.ToDoListSlide}>
            <button className={style.btn}>
            <strong>+</strong> 일정 작성하기
            </button>
            <Routes>
                <Route path="/" element={<ToDoListDash />} />
            </Routes>
        </div>
    );
};

export default ToDoListSlide;