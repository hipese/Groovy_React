import style from "./Org_Chart_View.module.css"


const Org_Chart_View = ({ approver }) => {

    return (
        <div className={style.view_div}>

            <div className={style.view}>
                {/* {!approver.id ? <div className={style.null}>
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
                </div>} */}

            </div>

        </div>
    );
}

export default Org_Chart_View;