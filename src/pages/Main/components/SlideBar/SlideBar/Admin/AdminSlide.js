import style from "./AdminSlide.module.css";

import { Link } from "react-router-dom";
import down from "./assets/down.svg";
import { useState } from "react"; // useState 추가

const AdminSlide = () => {
    const [isHidden, setIsHidden] = useState(false);

    const handleHid = () => {
        setIsHidden(!isHidden);
    }

    const [isHidden2, setIsHidden2] = useState(false);

    const handleHid2 = () => {
        setIsHidden2(!isHidden2);
    }

    return (
        <div className={style.AdminSlide}>
            <Link to="/Groovy/admin">
                <button className={style.btn1}>
                    Home
                </button>
            </Link>
            <button className={style.btn2} onClick={handleHid}>
                사용자 관리
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <Link to="/Groovy/admin">
                        <button className={style.btn}>
                            사용자 관리
                        </button>
                    </Link>
                    <Link to="/Groovy/admin/password">
                        <button className={style.btn}>
                            비밀번호 관리
                        </button>
                    </Link>
                    <Link to="/Groovy/admin/inactive">
                        <button className={style.btn}>
                            비활성 사용자
                        </button>
                    </Link>
                </>
            )}
            <button className={style.btn2} onClick={handleHid2}>
                직위/직무 관리
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden2 && (
                <>
                    <Link to="/Groovy/admin/position">
                        <button className={style.btn}>
                            직위 관리
                        </button>
                    </Link>
                    <Link to="/Groovy/admin/dept">
                        <button className={style.btn}>
                            직무 관리
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default AdminSlide;