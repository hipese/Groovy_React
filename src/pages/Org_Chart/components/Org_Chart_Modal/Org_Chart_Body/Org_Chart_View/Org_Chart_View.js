import style from "./Org_Chart_View.module.css"


const Org_Chart_View = ({ selectedEmployee }) => {




    return (
        <div className={style.view_div}>

            <div className={style.view}>
                {selectedEmployee && (
                    <>
                        <p>이름: {selectedEmployee.name}</p>
                        <p>부서: {selectedEmployee.department}</p>
                        {/* 여기에 더 많은 직원 정보를 표시할 수 있습니다. */}
                    </>
                )}
            </div>

            <div className={style.view}>

            </div>

        </div>
    );
}

export default Org_Chart_View;