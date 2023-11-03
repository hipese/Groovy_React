    import styled from "styled-components";
    import { Routes, Route, Link } from "react-router-dom";
    import style from "../SlideBar.module.css";
    import styles from "./CalendarSlide.module.css";

    const CalendarWrite = () => {
        return (
            <div>
                <div>
                    <button className={style.btn}>
                        <strong>+</strong> 일정 추가
                        </button>
                </div>
                <div className={styles.Calendar}>
                     캘린더 들어갈 자리
                </div>
                <div className={styles.MyCalendar}>
                    내 캘린더
                </div>
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