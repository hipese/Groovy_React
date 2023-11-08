import React, { useEffect, useState, useContext } from "react";    
import styled from "styled-components";
import style from "../SlideBar.module.css";
import styles from "./CalendarSlide.module.css";
import Modal from "./CalendarModal"

const CalendarWrite = ({refreshList}) => {
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        if(!showModal) {
            refreshList();
        }
     }, [showModal]);

    return (
        <div>
            <button className={style.btn} onClick={() => setShowModal(true)}>
                <strong>+</strong> 일정 추가
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} onEventAdded={refreshList}/>
            <div className={styles.Calendar}>
                캘린더 들어갈 자리
            </div>
            <div className={styles.MyCalendar}>
                내 캘린더
            </div>
        </div>
    );
};

const CalendarSlide = ({refreshList}) => {
    return (
        <div className={style.Calendar}>
            <CalendarWrite refreshList={refreshList}/>
        </div>
    );
};

export default CalendarSlide;