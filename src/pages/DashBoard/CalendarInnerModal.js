import React from 'react'
import styles from '../Calendar/Calendar.module.css';
import { format, parseISO, subDays } from 'date-fns';
import axios from 'axios';


const CalendarInnerModal = ({ isOpen, onClose, eventDetails, onEventAdded }) => {
    if (!isOpen) return null;

    const closeModal = (e) => {
        if (e.target.id === "modalOverlay") {
            onClose();
        }
    };
    
    return (
        <div id='modalOverlay' className={styles[`modal-overlay`]} onClick={closeModal}>
            <div className={styles[`modal-container`]}>
                <div className={styles[`modal-title`]}>일정 내용</div>                
                    {eventDetails.map((e,i)=>{
                        return(
                            <ul key={i}>
                                <>
                                    <li><span>일정 제목</span> <div className={styles.modaltitle}>{e.title}</div></li>
                                    <li><span>일정 시간</span> <div className={styles.modaltime}>{format(new Date(e.starttime), 'yyyy-MM-dd')} ~ {format(new Date(e.endtime), 'yyyy-MM-dd')}</div></li>
                                    <li><span>일정 등록일</span> <div className={styles.modalwrite}>{e.write_date}</div></li>
                                    <li><span>일정 내용</span> <div className={styles.modalcontents}>{e.contents}</div></li>    
                                </>
                            </ul>
                        )
                    })}
                
                <div className={styles[`modal-buttons`]}>
                    <button className={styles.check} onClick={onClose}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarInnerModal;