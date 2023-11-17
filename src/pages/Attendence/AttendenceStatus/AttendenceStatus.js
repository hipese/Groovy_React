import axios from "axios";
import style from "./AttendenceStatus.module.css";
import {  useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Today from "@mui/icons-material/Today";


const AttendenceStatus = () => {


    const [attendence, setAttendence] = useState([]);
    const [attendenceCount,setAttendenceCount]=useState();

    useEffect(() => {
        axios.get("/api/attend/detail").then(resp => {
            console.log(resp.data)
            // 데이터를 가져온 후 시간 및 날짜 분리 처리
            const processedData = resp.data.map(item => {
                // 출근 및 퇴근 시간을 JavaScript Date 객체로 변환
                const workstartDate = new Date(item.workstart);
                const workendDate = new Date(item.workend);
                
                // 퇴근 날짜에서 '일' 부분만 추출
                const workStartDay = workstartDate && !isNaN(workstartDate.getTime()) ? workstartDate.getDate() : 0;
                const workEndDay = workendDate && !isNaN(workendDate.getTime()) ? workendDate.getDate() : 0;

                const isStartDay=item.workstart?true:false;
                const isEndDaytest=item.workend?true:false; 

                //널인값과 날짜가 같은지 아닌지를 비교해서 밑에 출석표시를 다르게 나타나게 한다.

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
                const totalWorkHours = Math.floor(totalWorkTimeInMinutes / 60) >= 23 ? 23 : Math.floor(totalWorkTimeInMinutes / 60);
                const adjustedWorkHours = totalWorkHours > 23 || totalWorkHours <= 0 ? 0 : totalWorkHours;
                const totalWorkMinutes = totalWorkTimeInMinutes % 60;

                return {
                    id: item.id,
                    workStartDate: workStartDateString,
                    workStartTime: workStartTimeString,
                    workEndDate: workEndDateString,
                    workEndTime: workEndTimeString,
                    workStartDay:workStartDay,
                    workEndDay:workEndDay,
                    totalWorkHours: totalWorkHours,
                    adjustedWorkHours: adjustedWorkHours,
                    totalWorkMinutes: totalWorkMinutes,
                    attendstatus: item.status,
                    isStartDay:isStartDay,
                    isEndDaytest:isEndDaytest,
                };
            });

            setAttendence(processedData);
        })

    }, [])

    useEffect(() => {

        axios.get(`/api/attend/attendenceCount`).then(resp => {
            setAttendenceCount(resp.data);
        })
    }, [])

    return (
        <div>
            <div>
                <div className={style.header}>
                    출퇴근 현황<hr />
                </div>

                <div className={style.documents1}>
                    <div className={style.titleText}>내 출퇴근 내역</div>
                    <div className={style.text}>
                        총 {attendence.length}일중에서 {attendenceCount}일 출석했습니다.
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: blue[200] }}>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">업무일자</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">출근시간</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">퇴근시간</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">총근무시간</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">출석정보</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {attendence.map((e, i) => {
                                    // 현재 시간을 구함니다.
                                    const currentTime = new Date();
                                    const today = currentTime.getDate(); // 일
                                    const currentHour = currentTime.getHours();
                                    const isPastSix = currentHour >= 18;

                            

                                    // 퇴근 시간이 18시가 넘었는지 확인합니다.  
                                    const isAbsent = e.workEndTime === null && isPastSix;
                                    return (
                                        <TableRow className={style.hoverEffect}
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ fontSize: '15px' }} align="center">{e.workStartDate}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{e.workStartTime}</TableCell>

                                            {isAbsent ? (
                                                // 만약 18시가 넘어서 채크했거나 퇴근을 클릭하지 않으면 결석입니다.
                                                <>
                                                    <TableCell style={{ fontSize: '15px' }} align="center">퇴근시간지남</TableCell>
                                                    <TableCell style={{ fontSize: '15px' }} align="center">퇴근시간지남</TableCell>
                                                </>
                                            ) : e.workEndTime !== null ? (
                                                // 퇴근시간이 있으면 시 언제 퇴근 했는지 표시
                                                <>
                                                    <TableCell style={{ fontSize: '15px' }} align="center">{e.workEndTime}.</TableCell>
                                                    <TableCell style={{ fontSize: '15px' }} align="center"> {`${(e.workStartDay!=e.workEndDay||e.totalWorkHours >= 23)? "비정상적인 근무시간" : `${e.totalWorkHours}시간 ${e.totalWorkMinutes.toFixed(0)}분`}`}</TableCell>
                                                </>
                                            ) :(
                                                // 퇴근을 하지 않았을때 표시
                                                <>
                                                    <TableCell style={{ fontSize: '15px' }} align="center">{`${(e.workStartDay==today)? "근무중" : `퇴근정보없음`}`}</TableCell>
                                                    <TableCell style={{ fontSize: '15px' }} align="center">{`${(e.workStartDay==today)? "근무중" : `퇴근정보없음`}`}</TableCell>
                                                </>
                                            )}

                                            {e.attendstatus == 0 ? <TableCell style={{ fontSize: '15px' }} align="center">
                                                <Stack sx={{ width: '60%', margin: '0 auto' }} spacing={2}>
                                                    <Alert variant="filled" severity="error">
                                                        결석
                                                    </Alert>
                                                </Stack>
                                            </TableCell> :
                                                <TableCell style={{ fontSize: '15px' }} align="center">
                                                    <Stack sx={{ width: '60%', margin: '0 auto' }} spacing={2}>
                                                        <Alert variant="filled" severity="success">
                                                            출석
                                                        </Alert>
                                                    </Stack>
                                                </TableCell>}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div >

    );
}

export default AttendenceStatus;