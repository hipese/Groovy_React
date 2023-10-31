import styled from "styled-components";
import { Link } from "react-router-dom";
import style from "./CalendarSlide.module.css";


const CalendarSlide = () => {
    return (
        <div className={style.CalendarSlide}>
            <button className={style.btn}>
            <strong>+</strong> 캘린더
          </button>
        </div>
    );
};

export default CalendarSlide;