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
import VacationEdit from "../../Vacation/VacationEdit";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
        </Box>
    );
};

const AttendenceMain = () => {

    const members = useContext(MemberContext);
    const {myVacation,setMyVacation, addVacation, setAddVacation}=useContext(VacationContext);

    const [vacation_complete_list, setVacation_complete_list] = useState([]);
    const [vacation_wait_list, setVacation_wait_list] = useState([]);
    const [total_vactionDate, setTotal_vactionDate] = useState();
    const [loading, setLoading] = useState(true);


    //=========================================================================


    const [openModal, setOpenModal] = useState(false); // 모달 상태
    const [editingField, setEditingField] = useState(null);// 모달 제어용 

    const handleEdit = (field) => {
        setEditingField(field); // 수정 중인 필드 설정
        setOpenModal(true); // 모달 열기
    };


    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingField(null); // 수정 중인 필드 상태를 초기화
    };

    //=========================================================================

   
    useEffect(() => {
        if (members.member) {
          const url = total_vactionDate 
            ? `/api/vacation/myVacation/${members.member.id}/${total_vactionDate}`
            : `/api/vacation/myVacation/${members.member.id}`;
      
          axios.get(url).then(resp => {
            setMyVacation(resp.data || {});
          }).catch(error => {
            console.error('There was an error fetching the vacation data', error);
          });
        }
      }, [members, total_vactionDate]);


    useEffect(() => {
        axios.get(`/api/attend/vacation_complete`).then((resp) => {
            setVacation_complete_list(resp.data);
    
            // Calculate total used days for completed documents
            const totalUsedDays = resp.data.reduce((acc, doc) => acc + doc.total_date, 0);
            setTotal_vactionDate(totalUsedDays);
            setLoading(false);
        });
    
        axios.get("/api/attend/vacation_wait").then((resp1) => {
            setVacation_wait_list(resp1.data);
        });
    }, []);

    if (loading) {
        // 데이터 로딩 중에는 로딩창을 표시
        return <CircularIndeterminate />;
    }
    return (
        <div>
            <div className={style.header}>
                근태관리 홈
                <hr />
            </div>

            <div className={style.documents1}>
                <div className={style.titleText}>내 연차 내역</div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: blue[200] }}>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{members.member.group_name}</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`총연차`}</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`사용연차`}</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`잔여연차`}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {members.member.id ?
                                <TableRow className={style.hoverEffect}
                                    key={99}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                    }
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {`${members.member.name} ${members.member.position}`}
                                    </TableCell>
                                    <TableCell align="center">{`${myVacation.totalAnnualEntitlement}일`}</TableCell>
                                    <TableCell align="center">{`${myVacation.usedDays}일`}</TableCell>
                                    <TableCell align="center">{`${myVacation.totalAnnualEntitlement - total_vactionDate}일`}</TableCell>
                                </TableRow>
                                : "사용자를 불러오지 못하였습니다."}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <button className={style.btn} onClick={() => handleEdit('vacation')}>휴가조절(관리자만 사용하세요)</button>
                <Modal
                    open={openModal && editingField === 'vacation'}
                    onClose={handleCloseModal}
                >
                    <VacationEdit onClose={handleCloseModal}  />
                </Modal>
            </div>

            <div className={style.documents2}>
                <div className={style.titleText}>휴가신청 완료</div>
                <div className={style.text}>
                    <Link to="/Groovy/attend/attendenceComplete">
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
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">일수</TableCell>
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
                                    <TableCell align="center"><Link to={`/Groovy/attendence/detail/${e.seq}`}>{e.title}</Link></TableCell>
                                    <TableCell align="center">{e.writer}</TableCell>
                                    <TableCell align="center">{e.write_date}</TableCell>
                                    <TableCell align="center">{e.total_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className={style.documents3}>
                <div className={style.titleText}>휴가신청 진행중</div>
                <div className={style.text}>
                    <Link to="/Groovy/attend/attendenceWait">
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
                                    <TableCell align="center"><Link to={`/Groovy/attendence/detail/${e.seq}`}>{e.title}</Link></TableCell>
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
