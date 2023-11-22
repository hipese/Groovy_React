import { Link } from "react-router-dom";
import style from "./DashBoardSlide.module.css";
import { useState } from "react";
import down from "./assets/down.svg";

const DashBoardSlide = () => {
    const [isHidden, setIsHidden] = useState(false);

    const handleHid = () => {
        setIsHidden(!isHidden);
    }

    return (
        <div>
            <div className={style.DashBoardSlide}>
                <Link to="">
                    <button className={style.btn1}>
                        Home
                    </button>
                </Link>
            </div>
            <button className={style.btn2} onClick={handleHid}>
                프로젝트
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <div className={style.DashBoardSlide}>
                        <Link to="project"><button className={style.btn}>
                            프로젝트 보기
                        </button></Link>
                    </div>
                    <div className={`${style.DashBoardSlide} ${style.marginB10}`}>
                        <Link to="/Groovy/dashboard/project/create"><button className={`${style.btn}`}>
                            프로젝트 생성
                        </button></Link>
                    </div>
                </>
            )}

            <div className={style.DashBoardSlide}>
                <Link to="notice"><button className={style.btn}>
                    부서 내 소식 보기
                </button></Link>
            </div>
        </div>

    );
};

export default DashBoardSlide;