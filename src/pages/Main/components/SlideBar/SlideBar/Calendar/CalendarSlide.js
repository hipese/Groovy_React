    import styled from "styled-components";
    import { Routes, Route, Link } from "react-router-dom";
    import style from "./CalendarSlide.module.css";
    import CalendarSub0 from "../../../../../Calendar/Calendar";
    import CalendarSub1 from "../../../../../Calendar/CalendarSub1";
    import CalendarSub2 from "../../../../../Calendar/CalendarSub2";
    import CalendarSub3 from "../../../../../Calendar/CalendarSub3";

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
            <Routes>
                <Route path="/" element={<CalendarSub0 />} />
                <Route path="/Calendar2" element={<CalendarSub1 />} />
                <Route path="/Calendar3" element={<CalendarSub2 />} />
                <Route path="/Calendar4" element={<CalendarSub3 />} />
            </Routes>
        </div>
        );
    };

    export default CalendarSlide;