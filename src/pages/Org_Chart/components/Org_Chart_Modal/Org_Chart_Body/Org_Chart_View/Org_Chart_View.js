import style from "./Org_Chart_View.module.css"


const Org_Chart_View = ({ approver }) => {

    return (
        <div className={style.view_div}>

            <div className={style.table_row_head}>
                <div className={style.table_col_head}>이름</div>
                <div className={style.table_col_head}>직위 </div>
                <div className={style.table_col_head}>부서</div>
                <div className={style.table_col_head}>사원ID</div>
            </div>

            {!approver.id ? <div className={style.null}>
                결제자를 선택해주세요
            </div> : <div className={style.table_row}>
                <div className={style.table_col}>
                    {approver.name}
                </div>
                <div className={style.table_col}>
                    {approver.position}
                </div>
                <div className={style.table_col}>
                    {approver.group_name}
                </div>
                <div className={style.table_col}>
                    {approver.id}
                </div>
            </div>}

            {!approver.id?" ": <div>
                여기에는 상세정보 뜨게 하던가 하자 ex 출근, 퇴근, 휴가 여부 등
            </div>}
           

        </div>
    );
}

export default Org_Chart_View;