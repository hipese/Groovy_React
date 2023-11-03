import style from "./Org_Chart_Table.module.css"



const Org_Chart_Table=()=>{
    return(
        <div className={style.table}>
            <div className={style.table_header}>
                <input className={style.table_input} type="text" placeholder="이름, 부서 검색"/>
            </div>
        </div>
    );
}

export default Org_Chart_Table;