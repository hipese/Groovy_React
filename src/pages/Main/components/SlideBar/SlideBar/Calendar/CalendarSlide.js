    import styled from "styled-components";
    import { Routes, Route, Link } from "react-router-dom";
    import style from "./CalendarSlide.module.css";

    const CalendarWrite = () => {
        return (
            <div className={style.CalendarSlide}>
                <Link to="">
                    <button className={style.btn}>
                        <strong>+</strong> 캘린더
                    </button>
                </Link>
                <Link to="Calendar2">
                    <button className={style.btn}>
                        <strong>+</strong> 일정
                    </button>
                </Link>
                <Link to="Calendar3">
                    <button className={style.btn}>
                        <strong>+</strong> 일정2
                    </button>
                </Link>
                <Link to="Calendar4">
                    <button className={style.btn}>
                        <strong>+</strong> 일정3
                    </button>
                </Link>
            </div>
        );
    };

    const CalendarSlide = () => {
        return (
        <div className={style.Calendar}>
            <CalendarWrite />
        </div>
        );
    };

    export default CalendarSlide;