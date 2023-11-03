import style from "./Org_Chart_Table.module.css"



const Org_Chart_Table=()=>{
    return(
        <div className={style.table}>
            <div className={style.table_header}>
                <input className={style.table_input} type="text" placeholder="이름, 부서 검색"/>
                <button className={style.btn}>검색</button>
            </div>

            <div className={style.table_body}>
                    <div className={style.table_row}>
                        <div className={style.table_col}>이름</div>
                        <div className={style.table_col}>직위 </div>
                        <div className={style.table_col}>부서</div>
                        <div className={style.table_col}>사원ID</div>
                    </div>

                    <div className={style.table_row}>
                        <div className={style.table_col}>안성진</div>
                        <div className={style.table_col}>사원</div>
                        <div className={style.table_col}>인사과</div>
                        <div className={style.table_col}>1120</div>
                    </div>


            </div>
        </div>
    );
}

export default Org_Chart_Table;