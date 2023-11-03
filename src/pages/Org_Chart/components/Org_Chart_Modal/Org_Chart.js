import React from "react";
import style from "./Org_Chart.module.css"
import Org_Chart_Table from "./Org_Chart_Body/Org_Chart_Table/Org_Chart_Table";
import Org_Chart_DropDown from "./Org_Chart_Body/Org_Chart_DropDown/Org_Char_DropDown";

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

                        <div className={style.search_div}>

                            <div className={style.dropbox}>
                                <Org_Chart_DropDown/>
                            </div>

                            <div className={style.tablebox}>
                                <Org_Chart_Table/>
                            </div>


                        </div>



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