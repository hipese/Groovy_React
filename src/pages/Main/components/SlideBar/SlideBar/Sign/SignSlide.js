import { useState } from "react";
import style from "./SignSlide.module.css";
import { Link } from "react-router-dom"

const SignSlide = () => {

    const [isHidden, setIsHidden] = useState(false);

    const handleHid = () => {
        setIsHidden(!isHidden);
    }

    return (
        <div className={style.SignSlide}>
            <Link to="write">
                <button className={style.btn1}>
                    <strong>+ 전자 결재 작성</strong>
                </button>
            </Link>

            <div className={style.btndiv}>
                <Link to="">
                    <button className={style.btn}>전자결재 홈</button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="review">
                    <button className={style.btn}>중간검토문서</button>
                </Link>
            </div>

            <button className={style.btn2} onClick={handleHid}>
                결재 관리
                <img src="/assets/down.svg" alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <Link to="wait">
                        <button className={style.btn}>
                            결재대기중
                        </button>
                    </Link>
                    <Link to="progress">
                        <button className={style.btn}>
                            진행중문서
                        </button>
                    </Link>
                    <Link to="complete">
                        <button className={style.btn}>
                            완료문서
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default SignSlide;