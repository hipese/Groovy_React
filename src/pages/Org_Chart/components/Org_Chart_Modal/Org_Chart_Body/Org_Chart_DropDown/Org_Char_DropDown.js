import { useContext, useEffect, useState } from "react";
import style from "./Org_Char_DropDown.module.css"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DepartmentContext } from "../../../../../Groovy/Groovy";

const Org_Chart_DropDown = ({ setEmployees, backUpEmployees }) => {
    // 드롭다운의 표시 상태를 관리하는 state
    const [selectedDepartment, setSelectedDepartment] = useState("");
    // 드롭다운의 표시 상태를 관리하는 state
    const { department } = useContext(DepartmentContext);

    const handleReset = () => {
        setSelectedDepartment(""); // 상태 초기화
        setEmployees(backUpEmployees);
    }

    const handleChange = (event) => {
        setSelectedDepartment(event.target.value);
        if (event.target.value === "") {
            setEmployees(backUpEmployees); // 상태 초기화
        }
    };

    // 필터링 로직을 useEffect 내부로 옮깁니다.
    useEffect(() => {
        if (selectedDepartment) {
            const filteredEmployees = backUpEmployees.filter(employee =>
                employee.group_name === selectedDepartment
            );
            setEmployees(filteredEmployees);
        } else {
            setEmployees(backUpEmployees); // 상태 초기화
        }
        
    }, [selectedDepartment, backUpEmployees, setEmployees]);

    return (
        <div className={style.main}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="department-select-label">부서</InputLabel>
                    <Select
                        labelId="department-select-label"
                        id="department-select"
                        value={selectedDepartment}
                        label="Department"
                        onChange={handleChange}
                    >
                        {department.map((dept, i) => (
                            <MenuItem key={i} value={dept.dept_name}>{dept.dept_name}</MenuItem>
                        ))}
                        <MenuItem key={"all"} value="" onClick={handleReset}>전체목록 보기</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}

export default Org_Chart_DropDown;