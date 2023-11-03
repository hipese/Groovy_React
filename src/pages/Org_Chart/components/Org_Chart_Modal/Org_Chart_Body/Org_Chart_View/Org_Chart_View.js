import style from "./Org_Chart_View.module.css"


const Org_Chart_View = ({ selectedEmployee }) => {




    return (
        <div className={style.view_div}>

            <div className={style.view}>
                중간결제자 선택시 데이터 이동
            </div>

            <div className={style.view}>
                최종결제자 선택시 데이터 이동
            </div>

        </div>
    );
}

export default Org_Chart_View;