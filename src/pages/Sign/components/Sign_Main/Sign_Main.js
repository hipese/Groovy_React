import style from "./Sign_Main.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey, blue } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PendingIcon from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { red } from '@mui/material/colors';

const Sign_Main = () => {

    const [sign_wait_list, setSign_wait_list] = useState([]);
    const [sign_progress_list, setSign_progress_list] = useState([]);
    const [sign_complete_list, setSign_complete_list] = useState([]);

    useEffect(() => {
        axios.get("/api/signlist/wait").then((resp) => {
            setSign_wait_list(resp.data);
        });

        axios.get("/api/signlist").then((resp1) => {
            setSign_progress_list(resp1.data);
        });

        axios.get("/api/signlist/complete").then((resp2) => {
            setSign_complete_list(resp2.data);
        });
    }, []);

    return (

        <div className={style.sign_container}>
            <div className={style.header}>
                전자결제 홈
                <hr />
            </div>

            <div className={style.documents}>
                <div className={style.titleText}>결제 대기중 문서</div>
                <div className={style.text}>
                    <Link to="/Groovy/signlist/wait">
                        {`승인할 문서가 ${sign_wait_list.length}건이 있습니다.`}
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
                            {sign_wait_list.slice(0, 3).map((e, i) => (
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

            <div className={style.documents}>
                <div className={style.titleText}>결제 진행중인 문서</div>
                <div className={style.text}>
                    <Link to="/Groovy/signlist/progress">
                        {`진행중 문서가 ${sign_progress_list.length}건이 있습니다.`}
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
                            {sign_progress_list.slice(0, 3).map((e, i) => (
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

            <div className={style.documents}>
                <div className={style.titleText}>완료된 문서</div>
                <div className={style.text}>
                    <Link to="/Groovy/signlist/complete">
                        {`완료된 문서가 ${sign_complete_list.length}건이 있습니다.`}
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
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">결재여부</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {sign_complete_list.slice(0, 3).map((e, i) => (
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
                                    <TableCell align="center">{e.accept === 0 ? <DoneIcon style={{ color: 'green' }} /> : e.accept === 1 ? <PendingIcon /> : e.accept === 2 ? <CloseIcon style={{ color: red[600] }} /> : <QuestionMarkIcon />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Sign_Main;