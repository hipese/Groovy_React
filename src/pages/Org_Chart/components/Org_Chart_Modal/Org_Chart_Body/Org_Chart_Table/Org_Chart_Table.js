import axios from "axios";
import style from "./Org_Chart_Table.module.css"
import  { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MemberContext } from "../../../../../Groovy/Groovy";


const columns = [
    { id: 'id', label: '사원ID', minWidth: 100 },
    { id: 'group_name', label: '부서', minWidth: 100 },
    {
        id: 'position',
        label: '직위',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'name',
        label: '이름',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];


const Org_Chart_Table = ({ setEmployees, employees, selectedRow, setSelectedRow, setApprover, setSelectMemberdetail ,setMyPositionRank,setIsSend,isSign}) => {

    const members=useContext(MemberContext);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [searchText, setSearchText] = useState("");

    // 행을 클릭했을 때 해당 행의 색깔을 변경하고 그 행에 id값을 가진 사람을 선택합니다.
    const handleRowClick = async (id) => {
        console.log(id)
        if (selectedRow === id) {
            setSelectedRow(null);
            setApprover({});
        } else {
            setSelectedRow(id);
            try {
                const respApprover = await axios.get(`/api/member/${id}`);
                setApprover(respApprover.data);
                
                const respRank = await axios.get(`/api/positionRank/isRanking/${respApprover.data.position}/${members.member.position}`);
                setMyPositionRank(respRank.data);
                if(isSign){
                    setIsSend(respRank.data);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // 오류 처리를 할 수 있습니다.
            }

            axios.get(`/api/member/detail/${id}`).then(resp => {
                setSelectMemberdetail(resp.data);
                console.log(resp.data);
            })
        }
    };


    const handleChange = (e) => {
        if (!e.target.value.includes('/')) {
            setSearchText(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        // 'Enter' 키가 눌렸는지 확인합니다.
        if (e.key === 'Enter') {
            haadlesearch();
        }
    };


    //검색을 실행하는 함수
    const haadlesearch = (e) => {
        if (!searchText.trim()) {
            alert("검색할 문자를 입력해주세요");
            return;
        }

        axios.get(`/api/member/search/${searchText}`).then(resp => {
            if (resp.data.length === 0) {
                alert("검색결과가 존재하지 않습니다.")
            } else {
                setEmployees(resp.data);
            }

        });
    }


    return (
        <div className={style.table}>
            <div className={style.table_header}>
                <input className={style.table_input} type="text" name="searchText" value={searchText}
                    placeholder="이름, 부서, 직위 검색" onChange={handleChange} onKeyDown={handleKeyDown} />

                <button className={style.btn} onClick={haadlesearch} > 검색</button>
            </div>
            <div className={style.table_body}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees && employees.length > 0
                                    ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const isSelected = selectedRow === row.id;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                                onClick={() => handleRowClick(row.id)}
                                                sx={{ bgcolor: isSelected ? 'Skyblue' : 'inherit' }} // 선택된 행의 배경색 변경
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={employees ? employees.length : 0} // 조건부 접근
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>
        </div>
    );
}

export default Org_Chart_Table;