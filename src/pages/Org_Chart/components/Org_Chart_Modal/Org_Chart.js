import React from "react";
import style from "./Org_Chart.module.css"

const Org_Chart = ({ isOpen, close }) => {

    if (!isOpen) return null;

    const handleSelect = () => {

    }

    return (
        <div>
            <div className={style.modal_overlay}>

                <div className={style.modal}>
                    <div className={style.modal_head}>
                        <h4 className={style.modal_title}>조직도 검색</h4>
                    </div>

                    <div className={style.modal_body}>

                        <div className={style.search_div}>search</div>

                        <div className={style.select_div}>

                            <div className={style.select_btndiv}>
                                <button className={style.modal_close_button}>중간결제자</button>
                            </div>

                            <div className={style.select_btndiv}>
                                <button className={style.modal_close_button}>최종결제자</button>
                            </div>

                        </div>


                        <div className={style.view_div}>

                            <div className={style.view}>

                            </div>

                            <div className={style.view}>

                            </div>

                        </div>
                    </div>

                    <div className={style.modal_footer}>
                        <button onClick={handleSelect} className={style.modal_close_button}>확인</button>
                        <button onClick={close} className={style.modal_close_button}>닫기</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Org_Chart;