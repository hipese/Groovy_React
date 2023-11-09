import axios from "axios";
import style from "./AttendenceStatus.module.css";
import { useEffect, useState } from "react";

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
                    출퇴근 현황
                    <hr />
                </div><div className={style.documents1}>
                    <div className={style.titleText}>내 출퇴근 내역</div>
                    <div className={style.tableBox}>
                        <div className={`${style.tableRow} ${style.tableHead}`}>
                            <div>업무일자</div>
                            <div>출근시간</div>
                            <div>퇴근시간</div>
                            <div>총근무시간</div>
                        </div>

                        {attendence.map((e, i) => {
                            return (
                                <div className={style.tableRow} key={i}>
                                    <div>{e.workStartDate}</div>
                                    <div>{e.workStartTime}</div>
                                    {e.workEndTime !== null ? (
                                        <>
                                            <div>{e.workEndTime}.</div>
                                            <div>{e.totalWorkHours}시간 {e.totalWorkMinutes.toFixed(0)}분</div>
                                        </>
                                    ) : (
                                        // If there is no workend, set to an empty string or any desired placeholder
                                        <>
                                            <div>근무중</div>
                                            <div>근무중</div>
                                        </>
                                    )}
                                </div>
                            );
                        })}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendenceStatus;