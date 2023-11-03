import { useState } from "react";
import style from "./Org_Char_DropDown.module.css"
import down from "./assets/down.svg";

const Org_Chart_DropDown = () => {

    // 드롭다운의 표시 상태를 관리하는 state
    const [isOpen, setIsOpen] = useState(false);


    // 드롭다운 메뉴를 토글하는 함수
    const toggleDropdown = () => setIsOpen(!isOpen);

    // 드롭다운 내용을 관리하는 배열
    const departments = ['부서 1', '부서 2', '부서 3', '부서 4']; // 예시 부서 목록

    return (
        <div className={style.main}>

            <div className={style.button_div} onClick={toggleDropdown}>
                <button className={style.button}>
                    <img src={down} alt="" width={"40px"} height={"30px"} />
                    부서목록
                </button>
            </div>


            {isOpen &&
                <div className={style.contents_div}>
                    <ul>
                        {departments.map((department, index) => (
                            <li key={index}>{department}</li>
                        ))}
                    </ul>
                </div>
            }


        </div>

    );
}

export default Org_Chart_DropDown;