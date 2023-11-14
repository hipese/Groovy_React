import axios from "axios";
import style from "./AttendenceStatus.module.css";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey, blue } from '@mui/material/colors';

const AttendenceStatus = () => {

    const [attendence, setAttendence] = useState([]);

    useEffect(() => {
        axios.get("/api/attend").then(resp => {
            // 데이터를 가져온 후 시간 및 날짜 분리 처리
            const processedData = resp.data.map(item => {
                // 출근 및 퇴근 시간을 JavaScript Date 객체로 변환
                const workstartDate = new Date(item.workstart);
                const workendDate = new Date(item.workend);

                // 날짜 및 시간 형식 지정
                const dateFormatOptions = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };
                const timeFormatOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };

                // 각각의 필드에 적용
                const workStartDateString = workstartDate.toLocaleDateString(undefined, dateFormatOptions);
                const workStartTimeString = workstartDate.toLocaleTimeString(undefined, timeFormatOptions);
                const workEndDateString = workendDate.toLocaleDateString(undefined, dateFormatOptions);
                const workEndTimeString = item.workend !== null ? workendDate.toLocaleTimeString(undefined, timeFormatOptions) : null;
                const totalWorkTimeInMinutes = (workendDate - workstartDate) / (1000 * 60); // 분 단위로 변환
                const totalWorkHours = Math.floor(totalWorkTimeInMinutes / 60);
                const totalWorkMinutes = totalWorkTimeInMinutes % 60;
                return {
                    id: item.id,
                    workStartDate: workStartDateString,
                    workStartTime: workStartTimeString,
                    workEndDate: workEndDateString,
                    workEndTime: workEndTimeString,
                    totalWorkHours: totalWorkHours,
                    totalWorkMinutes: totalWorkMinutes
                };
            });

            setAttendence(processedData);
        });
    }, []);

    return (
        <div>
            <div>
                <div className={style.header}>
                    출퇴근 현황<hr />
                </div>

                <div className={style.documents1}>
                    <div className={style.titleText}>내 출퇴근 내역</div>
                    <div className={style.text}>
                        출석일수를 구해는 로직을 만들어보자
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: blue[200] }}>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">업무일자</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">출근시간</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">퇴근시간</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">총근무시간</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {attendence.map((e, i) => (
                                    <TableRow className={style.hoverEffect}
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                        }
                                    >
                                        <TableCell style={{ fontSize: '15px' }} align="center">{e.workStartDate}</TableCell>
                                        <TableCell style={{ fontSize: '15px' }} align="center">{e.workStartTime}</TableCell>

                                        {e.workEndTime !== null ? (
                                            <>
                                                <TableCell style={{ fontSize: '15px' }} align="center">{e.workEndTime}.</TableCell>
                                                <TableCell style={{ fontSize: '15px' }} align="center">{e.totalWorkHours}시간 {e.totalWorkMinutes.toFixed(0)}분</TableCell>
                                            </>
                                        ) : (
                                            // If there is no workend, set to an empty string or any desired placeholder
                                            <>
                                                <TableCell style={{ fontSize: '15px' }} align="center">근무중</TableCell>
                                                <TableCell style={{ fontSize: '15px' }} align="center">근무중</TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>
            </div>
        </div >

    );
}

export default AttendenceStatus;