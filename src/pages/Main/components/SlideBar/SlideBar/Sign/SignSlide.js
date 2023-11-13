import style from "./SignSlide.module.css";
import { Link } from "react-router-dom"

const SignSlide = () => {
    return (
        <div className={style.SignSlide}>

            <div className={style.btndiv}>
                <Link to="write">
                    <button className={style.btn}><strong>전자 결재 작성</strong></button>
                </Link>
            </div>


            <div className={style.btndiv}>
                <Link to="">
                    <button className={style.btn}>전자결재 홈</button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="write">
                    <button className={style.btn}>새결재 진행</button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="wait">
                    <button className={style.btn}>결재대기중</button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="progress">
                    <button className={style.btn}>진행중문서</button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="complete">
                    <button className={style.btn}>완료문서</button>
                </Link>
            </div>


        </div>
    );
};

export default SignSlide;