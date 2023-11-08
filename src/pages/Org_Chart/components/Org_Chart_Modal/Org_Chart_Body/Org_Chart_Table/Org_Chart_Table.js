import style from "./Org_Chart_Table.module.css"
import React, { useState } from 'react';


const Org_Chart_Table = ({ employees, setEmployees }) => {

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
                    {employees.map((employee, index) => (
                        <div
                            key={index}
                            className={`${style.table_row} ${selectedRow === employee.id ? style.highlight : ''}`}
                            onClick={() => handleRowClick(employee.id)}
                        >
                            <div className={style.table_col}>{employee.name}</div>
                            <div className={style.table_col}>{employee.position}</div>
                            <div className={style.table_col}>{employee.group_name}</div>
                            <div className={style.table_col}>{employee.id}</div>
                        </div>
                    ))}

                </div>


            </div>
        </div>
    );
}

export default Org_Chart_Table;