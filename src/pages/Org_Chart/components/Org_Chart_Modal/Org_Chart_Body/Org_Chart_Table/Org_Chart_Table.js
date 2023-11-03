import style from "./Org_Chart_Table.module.css"
import React, { useState } from 'react';


const Org_Chart_Table = ({ selectedEmployee,setSelectedEmployee }) => {

    // 상태를 사용하여 선택된 행의 ID를 저장합니다.
    const [selectedRow, setSelectedRow] = useState(null);

    // 행을 클릭했을 때 호출되는 함수입니다.
    const handleRowClick = (e) => {
        // 클릭된 행의 ID를 상태에 설정합니다.
        console.log(e.target);
        setSelectedRow(e);
        
    };


    return (
        <div className={style.table}>
            <div className={style.table_header}>
                <input className={style.table_input} type="text" placeholder="이름, 부서 검색" />
                <button className={style.btn}>검색</button>
            </div>

            <div className={style.table_body}>
                <div className={style.table_row}>
                    <div className={style.table_col}>이름</div>
                    <div className={style.table_col}>직위 </div>
                    <div className={style.table_col}>부서</div>
                    <div className={style.table_col}>사원ID</div>
                </div>


                <div className={style.contentsdiv}>

                    {/* 받아온 데이터를 아래의 양식대로 추가 */}
                    <div className={`${style.table_row} ${selectedRow === '1120' ? style.highlight : ''}`}
                        onClick={() => handleRowClick('1120')}>
                        <div className={style.table_col}>안성진</div>
                        <div className={style.table_col}>사원</div>
                        <div className={style.table_col}>인사과</div>
                        <div className={style.table_col}>1120</div>
                    </div>

                    <div className={`${style.table_row} ${selectedRow === '1114' ? style.highlight : ''}`}
                        onClick={() => handleRowClick('1114')}>
                        <div className={style.table_col}>김민석</div>
                        <div className={style.table_col}>사원</div>
                        <div className={style.table_col}>마캐팅</div>
                        <div className={style.table_col}>1114</div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Org_Chart_Table;