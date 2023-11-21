import { useEffect, useState } from "react";
import style from "./Org_Chart.module.css"
import Org_Chart_Table from "./Org_Chart_Body/Org_Chart_Table/Org_Chart_Table";
import Org_Chart_DropDown from "./Org_Chart_Body/Org_Chart_DropDown/Org_Char_DropDown";
import Org_Chart_View from "./Org_Chart_Body/Org_Chart_View/Org_Chart_View";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
        </Box>
    );
};



const Org_Chart = ({ isOpen, close, approver, setApprover, selectMemberdetail, setSelectMemberdetail,isSend,setIsSend ,isSign}) => {

    const [loading, setLoading] = useState(true);

    const [employees, setEmployees] = useState({}); // 여기서 선택된 직원의 목록을 보여줍니다.
    const [backUpEmployees, setBackUpEmployees] = useState({}); // 원래 직원의 목록을 저장합니다
    const [selectedRow, setSelectedRow] = useState(null); //선택한 행의 값을 가져옵니다.

    const [myPositionRank,setMyPositionRank]=useState(); //자신의 직급과 선택자의 직급을 비교한 값(같거나 높으면 false을 호출 아니면 true)

    useEffect(() => {
        axios.get("/api/member/selectedEmployee").then(resp => {
            setEmployees(resp.data)
            setBackUpEmployees(resp.data);
            setLoading(false);
        });
    }, []);


    const closeOK = () => {
        if (!approver || !approver.id) {
            alert("결재자를 선택해주세요");
            return;
        }


        close();
    }

    if (!isOpen) return null;

    if (loading) {
        // 데이터 로딩 중에는 로딩창을 표시
        return <CircularIndeterminate />;
    }

    return (
        <div className={style.modal}>
            <div className={style.modal_head}>
                <h4 className={style.modal_title}>직원 검색</h4>
            </div>

            <div className={style.modal_body}>

                <div className={style.search_div}>

                    <div className={style.dropbox}>
                        {!loading ? (
                            <Org_Chart_DropDown
                                employees={employees}
                                setEmployees={setEmployees}
                                backUpEmployees={backUpEmployees}
                            />
                        ) : (
                            <CircularIndeterminate />
                        )}
                    </div>

                    <div className={style.tablebox}>
                        <Org_Chart_Table employees={employees} setEmployees={setEmployees}
                            selectedRow={selectedRow} setSelectedRow={setSelectedRow}
                            setBackUpEmployees={setBackUpEmployees} setApprover={setApprover} setSelectMemberdetail={setSelectMemberdetail} 
                            setMyPositionRank={setMyPositionRank} isSend={isSend} setIsSend={setIsSend} isSign={isSign}/>
                    </div>

                </div>


                <div className={style.select_div}>
                    <div className={style.image}>
                        <img src="/assets/right_Arrow.png" alt="" />
                    </div>
                    {/* <div className={style.select_btndiv}>
                                <button className={style.modal_close_button} onClick={handleSelect}>결제자 선택</button>
                            </div> */}
                </div>


                <div className={style.view_div}>

                    <Org_Chart_View approver={approver} isSend={isSend} selectedRow={selectedRow} setApprover={setApprover} 
                    selectMemberdetail={selectMemberdetail} setIsSend={setIsSend} />

                </div>

            </div>

            <div className={style.modal_footer}>
                <button onClick={closeOK} className={style.modal_close_button}>확인</button>
                <button onClick={close} className={style.modal_close_button}>닫기</button>
            </div>
        </div>


    );
}

export default Org_Chart;