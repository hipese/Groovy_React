import React, { useEffect, useState, useContext } from "react";    
import styled from "styled-components";
import style from "../SlideBar.module.css";
import styles from "./CalendarSlide.module.css";
import Modal from "./CalendarModal"
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { to } from "@react-spring/core";

const CalendarWrite = ({refreshList}) => {
    const [showModal, setShowModal] = useState(false);
    let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
    
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar']}>
                        <DateCalendar
                        referenceDate={dayjs(todayStr)}
                        views={['year', 'month', 'day']}
                        />
                    </DemoContainer>
                </LocalizationProvider>
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