import React, { useState } from "react";
import style from "./Org_Chart.module.css"
import Org_Chart_Table from "./Org_Chart_Body/Org_Chart_Table/Org_Chart_Table";
import Org_Chart_DropDown from "./Org_Chart_Body/Org_Chart_DropDown/Org_Char_DropDown";
import Org_Chart_View from "./Org_Chart_Body/Org_Chart_View/Org_Chart_View";

const Org_Chart = ({ isOpen, close }) => {

    const [selectedEmployee, setSelectedEmployee] = useState({name:"",position:"",department:"",id:""}); // 여기서 선택된 직원의 상태를 관리합니다.

    if (!isOpen) return null;

    // 선택된 직원을 업데이트하는 함수
    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
    };

    // '중간결제자' 또는 '최종결제자' 버튼 클릭 시 처리할 함수
    const handleMidSelect = (role) => {
        console.log("이거 가져오냐?"+selectedEmployee);
    };

    const handleFinSelect = (role) => {
        console.log("이거 가져오냐?"+selectedEmployee);
    };

    

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
                                <Org_Chart_DropDown />
                            </div>

                            <div className={style.tablebox}>
                                <Org_Chart_Table selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}/>
                            </div>


                        </div>


                        <div className={style.select_div}>

                            <div className={style.select_btndiv}>
                                <button className={style.modal_close_button} onClick={handleMidSelect}>중간결제자</button>
                            </div>

                            <div className={style.select_btndiv}>
                                <button className={style.modal_close_button} onClick={handleFinSelect}>최종결제자</button>
                            </div>

                        </div>


                        <div className={style.view_div}>

                            <Org_Chart_View selectedEmployee={selectedEmployee}/>

                        </div>
                    </div>

                    <div className={style.modal_footer}>
                        <button onClick={close} className={style.modal_close_button}>확인</button>
                        <button onClick={close} className={style.modal_close_button}>닫기</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Org_Chart;