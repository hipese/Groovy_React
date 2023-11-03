import React from "react";
import style from "./Org_Chart.module.css"

const Org_Chart = ({ isOpen, close }) => {

    if (!isOpen) return null;

    return (
        <div>
            <div className={style.modal_overlay}>
                <div className={style.modal}>
                    <div className={style.modal_head}>
                        <h4 className={style.modal_title}>모달 제목</h4>
                        <button onClick={close} className={style.modal_close_button}>X</button>
                    </div>
                    <div className={style.modal_body}>
                        <p>여기에 모달 내용이 들어갑니다.</p>
                    </div>
                    <div className={style.modal_footer}>
                        <button onClick={close} className={style.modal_close_button}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Org_Chart;