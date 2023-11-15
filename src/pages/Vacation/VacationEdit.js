import {  forwardRef, useEffect, useState } from "react";
import style from "./VacationEdit.module.css"
import axios from "axios";
import Org_Chart from "../Org_Chart/components/Org_Chart_Modal/Org_Chart";


const VacationEdit = forwardRef((props, ref) => {

    //이 모달을 닫는 기능
    const { onClose } = props;

    //직원검색 모달을 닫는 기능
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const [vacation, setVacation] = useState([]);
    const [myVacation, setMyVacation] = useState({}); //나중에 년도 검색할거면 이거 배열로 바꾸고 로직 추가해야함 

    //직원 검색을 위한 변수들
    const [approver, setApprover] = useState({}); //선택한 직원의 정보을 저장하는 useState 
    const [selectMemberdetail, setSelectMemberdetail] = useState({}); //선택한 직원에 상세정보를 가져옵니다.

    useEffect(() => {
        axios.get("/api/vacation").then(resp => {
            setVacation(resp.data);
            console.log(resp.data);
        })
    },[])

    useEffect(() => {
        if (approver) {
            const fVacation = vacation.find(vacation => vacation.memberID === approver.id);
            setMyVacation(fVacation || {}); // find가 undefined를 반환할 경우 빈 객체를 사용합니다.
        }
    }, [approver, vacation]);


    const handleVacation = (e) => {
        const action = e.target.getAttribute('data-action');
        const vacationValue = action === 'add'
            ? document.getElementById('addVacation').value
            : document.getElementById('subtractVacation').value;

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
                        {myVacation.memberID ? <div className={style.documents1}>
                            <div className={style.titleText}>연차내역</div>
                            <div className={style.vacationStatus}>

                                <div className={style.name}>
                                    <div>{`${selectMemberdetail.name} ${selectMemberdetail.position}`}</div>
                                    <div>{selectMemberdetail.group_name}</div>
                                </div>

                                <div className={style.all}>
                                    <div>{`${myVacation.year} 총연차`}</div>
                                    <div>{`${myVacation.totalAnnualEntitlement}일`}</div>
                                </div>
                                <div className={style.use}>
                                    <div>{`${myVacation.year}년 사용연차`}</div>
                                    <div>{`${myVacation.usedDays}일`}</div>
                                </div>
                                <div className={style.left}>
                                    <div>{`${myVacation.year}년 잔여연차`}</div>
                                    <div>{`${myVacation.remainingDays}일`}</div>
                                </div>
                            </div>
                        </div> : "검색결과 없음"}
                    </div>

                    <div className={style.vacationEditDiv}>
                        <button className={style.btn} data-action="add" onClick={handleVacation}>
                            휴가 추가
                        </button>
                        <input type="text" placeholder="증가시키려는 휴가를 입력" id="addVacation" />
                        <button className={style.btn} data-action="subtract" onClick={handleVacation}>
                            휴가 차감
                        </button>
                        <input type="text" placeholder="차감시키려는 휴가를 입력" id="subtractVacation" />
                    </div>
                </div>

                <div className={style.footer}>
                    <button className={style.btn}>
                        확인
                    </button>
                    <button className={style.btn}>
                        나가기
                    </button>
                </div>


            </div>
        </div>

    );
})
export default VacationEdit;