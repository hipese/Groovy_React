import { forwardRef, useContext, useEffect, useState } from "react";
import style from "./VacationEdit.module.css"
import axios from "axios";
import Org_Chart from "../Org_Chart/components/Org_Chart_Modal/Org_Chart";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import SpinButton from "./SpinButton";
import { VacationContext } from "../Groovy/Groovy";

const VacationEdit = forwardRef((props, ref) => {

    //이 모달을 닫는 기능
    const { onClose } = props;

    //직원검색 모달을 닫는 기능
    const [isModalOpen, setModalOpen] = useState(false);
    const [approver, setApprover] = useState({}); //선택한 직원의 정보을 저장하는 useState 
    const [selectMemberdetail, setSelectMemberdetail] = useState({}); //선택한 직원에 상세정보를 가져옵니다.

    const [approverVacation, setApproverVacation] = useState({}); //선택한 직원의 정보을 저장하는 useState 
    const [vacation, setVacation] = useState([]);
    const {setMyVacation}=useContext(VacationContext);

     // 휴가 정보를 뿌리는 위한 값 가져오기
     useEffect(() => {
        axios.get("/api/vacation").then(resp => {
            setVacation(resp.data);
            console.log(resp.data);
        })
    }, [])


    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (approver) {
            const fVacation = vacation.find(vacation => vacation.memberID === approver.id);
            setApproverVacation(fVacation || {})
        }
    }, [approver, vacation]);

    const handleVacation = (e) => {
        const action = e.target.getAttribute('data-action');
        const vacationValue = action === 'add'
            ? document.getElementById('addVacation').value
            : document.getElementById('subtractVacation').value;


        
        if (!approver.id) {
            alert("직원들 선택해주세요.");
            return;
        }

        if (!vacationValue) {
            // 값이 없으면 경고하고 함수 종료
            alert("휴가 값을 입력해주세요.");
            return;
        }

        const url = action === 'add'
            ? '/api/vacation/add'
            : '/api/vacation/subtract';

        axios.post(url, { memberID: approver.id, amount: vacationValue })
            .then(resp => {
                // 여기에서 myVacation 상태를 업데이트합니다.
                setMyVacation(prevVacation => ({
                    ...prevVacation,
                    totalAnnualEntitlement: resp.data.totalAnnualEntitlement,
                    usedDays: resp.data.usedDays,
                    remainingDays: resp.data.remainingDays,
                })); 
                setApproverVacation(prevApproverVacation  => ({
                    ...prevApproverVacation ,
                    totalAnnualEntitlement: resp.data.totalAnnualEntitlement,
                    usedDays: resp.data.usedDays,
                    remainingDays: resp.data.remainingDays,
                })); 
            })
            .catch(error => {
                // 오류 처리 로직
                console.error("휴가 조절 중 오류 발생:", error);
            });

            axios.get(`/api/vacation/selectVacation/${approver.id}`)
            .then(resp => {
                console.log(resp.data)
                setApproverVacation(resp.data);
            })
            .catch(error => {
                // 오류 처리 로직
                console.error("휴가 조절 중 오류 발생:", error);
            });
    }


    return (
        <div className={style.contanier}>
            <div className={style.vacationContent}>
                <div className={style.headerTextDiv}>
                    휴가조절기능
                </div>

                <div className={style.body}>
                    <div className={style.searchBtn}>
                        <button onClick={toggleModal} className={style.btn}>직원검색</button>
                        <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover}
                            selectMemberdetail={selectMemberdetail} setSelectMemberdetail={setSelectMemberdetail} />
                    </div>

                    <div className={style.selectMemberVeiws}>
                        {approver.id&&approverVacation.memberID ? <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: blue[200] }}>
                                        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">이름</TableCell>
                                        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`총연차`}</TableCell>
                                        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`사용연차`}</TableCell>
                                        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">{`잔여연차`}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {approverVacation.memberID ?
                                        <TableRow className={style.hoverEffect}
                                            key={55}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                            }
                                        >
                                            <TableCell style={{ fontSize: '15px' }} component="th" scope="row" align="center">
                                                {`${approver.name} ${approver.position}`}
                                            </TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{`${approverVacation.totalAnnualEntitlement}일`}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{`${approverVacation.usedDays}일`}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{`${approverVacation.remainingDays}일`}</TableCell>
                                        </TableRow>
                                        : "사용자를 불러오지 못하였습니다."}
                                </TableBody>
                            </Table>
                        </TableContainer> : <div className={style.noneData}> "직원을 검색해주세요"</div>}
                    </div>

                    <div className={style.vacationEditDiv}>
                        <div className={style.editRow} >
                            <button className={style.btn} data-action="add" onClick={handleVacation}>
                                휴가 추가
                            </button>
                            <SpinButton id="addVacation"/>
                        </div>
                        <div className={style.editRow} >
                            <button className={style.btn} data-action="subtract" onClick={handleVacation}>
                                휴가 삭감
                            </button>
                            <SpinButton id="subtractVacation"/>
                        </div>
                    </div>
                </div>

                <div className={style.footer}>
                    <button onClick={() => { onClose() }} className={style.btn}>닫기</button>
                </div>

            </div>
        </div>

    );
})
export default VacationEdit;