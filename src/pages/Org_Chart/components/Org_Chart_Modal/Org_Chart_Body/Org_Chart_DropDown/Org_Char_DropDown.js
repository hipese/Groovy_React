import { useEffect, useState } from "react";
import style from "./Org_Char_DropDown.module.css"
import down from "./assets/down.svg";
import axios from "axios";

const Org_Chart_DropDown = ({ employees, setEmployees, backUpEmployees }) => {

    // 드롭다운의 표시 상태를 관리하는 state
    const [isOpen, setIsOpen] = useState(false);
    const [department, SetDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // 드롭다운 메뉴를 토글하는 함수
    const toggleDropdown = () => setIsOpen(!isOpen);

    // 드롭다운 내용을 관리하는 배열
    useEffect(() => {
        axios.get("/api/member/department").then(resp => {
            console.log(resp.data);
            SetDepartment(resp.data)
        });
    }, []);


    const handleDeptSearch = (group_name) => {
        // 부서 검색이 요청되면, 우선 전체 직원 목록으로 상태를 초기화하고,
        // 선택된 부서를 상태에 저장합니다.
        setSelectedDepartment(group_name);
    }

    useEffect(() => {
        // 부서가 선택되면, 모든 직원 목록으로 상태를 초기화합니다.
        if (selectedDepartment) {
            setEmployees(backUpEmployees);
        }
    }, [selectedDepartment, backUpEmployees]);


    useEffect(() => {
        // 선택된 부서가 있고, backUpEmployees가 준비되어 있을 때만 필터링을 수행합니다.
        if (selectedDepartment && backUpEmployees.length > 0) {
            const filteredEmployees = backUpEmployees.filter(employee =>
                employee.group_name === selectedDepartment
            );

            // 필터링된 결과로 상태를 업데이트합니다.
            setEmployees(filteredEmployees);
        }
    }, [selectedDepartment, backUpEmployees]);


    const handlereset=()=>{
        setEmployees(backUpEmployees);
    }

    return (
        <div className={style.main}>

            <div className={style.button_div} onClick={toggleDropdown}>
                <button className={style.button}>
                    <img src={down} alt="" width={"40px"} height={"30px"} />
                    부서목록
                </button>
            </div>

            {isOpen && (
                <div className={style.contents_div}>
                    <ul>
                        {department.map((dept, i) => (
                            // 클릭 이벤트에 현재 부서 이름을 전달합니다.
                            <li key={i} onClick={() => handleDeptSearch(dept.dept_name)}>
                                {dept.dept_name}
                            </li>
                        ))}
                        <li  onClick={() => handlereset()}>
                               전체목록 보기
                        </li>
                    </ul>
                </div>
            )}

        </div>

    );
}

export default Org_Chart_DropDown;