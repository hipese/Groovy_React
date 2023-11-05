import React from "react";
import styles from "./CalendarSlide.module.css";

const Modal = ({ showModal, setShowModal }) => {
    if (!showModal) return null;
    const closeModal = (e) => {
        if (e.target.id === "modalOverlay") {
            setShowModal(false);
        }
    };

    return (
        <div id="modalOverlay" className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal}>
                <div className={styles.scheduleTitle}>일정 추가</div>
                <div className={styles.ModalBody}>
                    <ul>
                        <li><span>캘린더</span>
                        <div className={styles.select}><select name="calendar">
                            <option>나의 프로젝트</option>
                        </select></div></li>
                        <li><span>일정 제목</span>
                        <div className={styles.input}><input type="text" name="title" /></div></li>
                        <li><span>시작</span>
                        <div className={styles.start}><input type="text" /></div></li>
                        <li><span>종료</span>
                        <div className={styles.end}><input type="text" /></div></li>
                        <li><span>알림</span>
                            <div className={styles.alarm}><input type="checkbox" /><span>메일</span>
                                <select name="alarm">
                                    <option value="">정시</option>
                                    <option value="">5분 전</option>
                                    <option value="">10분 전</option>
                                    <option value="" selected>15분 전</option>
                                    <option value="">30분 전</option>
                                    <option value="">1시간 전</option>
                                    <option value="">하루 전</option>
                                </select></div></li>
                        <li><span>내용</span>
                        <div className={styles.contents}><textarea name="contents"></textarea></div></li>
                    </ul>
                </div>
                <div className={styles.buttonbox}>
                    <button className={styles.submitButton} onClick={() => setShowModal(false)}>추가</button>
                    <button className={styles.cancelButton} onClick={() => setShowModal(false)}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
