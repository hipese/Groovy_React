import styles from "./ToDoListSlide.module.css";
import { Link, Route, Routes } from "react-router-dom";
import calendar from "./assets/calendar.png";
import grid from "./assets/grid.png";

const ToDoListSlide = () => {
    return (
        <div>
            <div className={styles.workspace}>
                {`OOO의 Workspace`}
            </div>
            <div className={styles.selectTitle}>
                Workspace Views
            </div>
            <Link to="">
                <div className={styles.select}>
                    <img src={grid} alt="where..?" width={"20px"} height={"20px"} /> <span className={styles.selectMenu}>Boards</span>
                </div>
            </Link>
            <Link to="ToDoListCalendar">
                <div className={styles.select}>
                    <img src={calendar} alt="where..?" width={"20px"} height={"20px"} /> <span className={styles.selectMenu}>Calendar</span>
                </div>
            </Link>
            <div className={styles.selectTitle}>
                Team Boards <span className={styles.selectDown}><button className={styles.btn}>+</button></span>
            </div>
            <Link to="ToDoListTeam">
                <div className={styles.select}>
                    <div className={styles.colorbox}></div> <span className={styles.selectMenu}>Team Board</span>
                </div>
            </Link>
            <div className={styles.selectTitle}>
                Your Boards <span className={styles.selectDown}><button className={styles.btn}>+</button></span>
            </div>
            <Link to="ToDoListBoard">
                <div className={styles.select}>
                    <div className={styles.colorbox}></div> <span className={styles.selectMenu}>My Board</span>
                </div>
            </Link>
        </div>
    );
};

export default ToDoListSlide;

            // <Link to="ToDoListBoard">
            //     <button className={style.btn}>
            //         <strong>+</strong> 내 보드
            //     </button>
            // </Link>
            // <Link to="ToDoListCalendar">
            //     <button className={style.btn}>
            //         <strong>+</strong> 캘린더
            //     </button>
            // </Link>
            // <Link to="ToDoListTeam">
            //     <button className={style.btn}>
            //         <strong>+</strong> 팀 보드
            //     </button>
            // </Link>