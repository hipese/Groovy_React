import { useContext, useEffect, useState } from "react";
import style from "./AttendenceMain.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import { MemberContext, VacationContext } from "../../Groovy/Groovy";


const AttendenceMain = () => {

    const members = useContext(MemberContext);
    const vacations = useContext(VacationContext);


    const [vacation_complete_list, setVacation_complete_list] = useState([]);
    const [vacation_wait_list, setVacation_wait_list] = useState([]);
    const [myVacation, setMyVacation] = useState({}); //나중에 년도 검색할거면 이거 배열로 바꾸고 로직 추가해야함

    useEffect(() => {

        const fVacation = vacations.vacation.find(vacation => vacation.memberId === members.member.id);
        setMyVacation(fVacation);
        console.log(myVacation);

        axios.get("/api/signlist/vacation_complete").then((resp) => {
            setVacation_complete_list(resp.data);
        });

        axios.get("/api/signlist/vacation_wait").then((resp1) => {
            setVacation_wait_list(resp1.data);
        });
    }, [members, vacations]);

    return (
        <div>
            <div className={style.header}>
                근태관리 홈
                <hr />
            </div>

            <div className={style.documents1}>
                <div className={style.titleText}>내 연차 내역</div>
                <div className={style.vacationStatus}>

                    <div className={style.name}>
                        <div>{`${members.member.name} ${members.member.position}`}</div>
                        <div>{members.member.group_name}</div>
                    </div>

                    <div className={style.all}>
                        <div>총연차</div>
                        <div>{`일`}</div>
                    </div>
                    <div className={style.use}>
                        <div>사용연차</div>
                        <div>9.5일</div>
                    </div>
                    <div className={style.left}>
                        <div>잔여연차</div>
                        <div>5.5일</div>
                    </div>
                </div>
            </div>

            <div className={style.documents2}>
                <div className={style.titleText}>휴가신청 완료</div>
                <div className={style.text}>
                    <Link to="/Groovy/signlist/wait">
                        {`완료된 문서가 ${vacation_complete_list.length}건이 있습니다.`}
                    </Link>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: blue[200] }}>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">문서번호</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">결제양식</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">제목</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안자</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안일</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {vacation_complete_list.slice(0, 3).map((e, i) => (
                                <TableRow className={style.hoverEffect}
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                    }
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {e.seq}
                                    </TableCell>
                                    <TableCell align="center">{e.document_type}</TableCell>
                                    <TableCell align="center"><Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link></TableCell>
                                    <TableCell align="center">{e.writer}</TableCell>
                                    <TableCell align="center">{e.write_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className={style.documents3}>
                <div className={style.titleText}>휴가신청 진행중</div>
                <div className={style.text}>
                    <Link to="/Groovy/signlist/wait">
                        {`진행중인 문서가 ${vacation_wait_list.length}건이 있습니다.`}
                    </Link>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: blue[200] }}>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">문서번호</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">결제양식</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">제목</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안자</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안일</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {vacation_wait_list.slice(0, 3).map((e, i) => (
                                <TableRow className={style.hoverEffect}
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                    }
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {e.seq}
                                    </TableCell>
                                    <TableCell align="center">{e.document_type}</TableCell>
                                    <TableCell align="center"><Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link></TableCell>
                                    <TableCell align="center">{e.writer}</TableCell>
                                    <TableCell align="center">{e.write_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default AttendenceMain;
