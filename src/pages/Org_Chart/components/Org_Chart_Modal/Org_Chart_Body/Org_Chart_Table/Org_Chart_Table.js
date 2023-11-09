import axios from "axios";
import style from "./Org_Chart_Table.module.css"
import React, { useEffect, useState } from 'react';


const Org_Chart_Table = ({ setEmployees, employees, selectedRow, setSelectedRow, backUpEmployees }) => {


    const [searchText, setSearchText] = useState("");

    // 행을 클릭했을 때 호출되는 함수입니다.
    const handleRowClick = (id) => {
        // 이미 선택된 행을 클릭하면 선택을 해제합니다.
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            // 다른 행을 클릭하면 선택된 행의 ID를 업데이트합니다.
            setSelectedRow(id);
            console.log(id);
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleKeyDown = (e) => {
        // 'Enter' 키가 눌렸는지 확인합니다.
        if (e.key === 'Enter') {
            haadlesearch();
        }
    };

    const haadlesearch = (e) => {
        console.log(searchText);
        setEmployees(backUpEmployees);

        if (searchText == null || searchText == "") {
            alert("검색할 문자를 입력해주세요");
            return;
        }

        axios.get(`/api/member/search/${searchText}`).then(resp => {
            console.log(resp.data);
            setEmployees(resp.data);
        });
    }


    return (
        <div className={style.table}>
            <div className={style.table_header}>
                <input className={style.table_input} type="text" name="searchText" value={searchText} 
                placeholder="이름, 부서 검색" onChange={handleChange} onKeyDown={handleKeyDown} />

                <button className={style.btn} onClick={haadlesearch} > 검색</button>
            </div>

            <div className={style.table_body}>
                <div className={style.table_row}>
                    <div className={style.table_col}>이름</div>
                    <div className={style.table_col}>직위 </div>
                    <div className={style.table_col}>부서</div>
                    <div className={style.table_col}>사원ID</div>
                </div>


                <div className={style.contentsdiv}>
                    {employees && employees.length > 0 ? employees.map((employee, index) => (
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
                    )) : <div className={style.nullDiv}>검색결과가 존재하지 않습니다.</div>}

                </div>


            </div>
        </div>
    );
}

export default Org_Chart_Table;