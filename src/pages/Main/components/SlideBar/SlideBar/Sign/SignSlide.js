import style from "./SignSlide.module.css";
import { Link } from "react-router-dom"

const SignSlide = () => {
    return (
        <div className={style.SignSlide}>

            <div className={style.btndiv}>
                <Link to="Sign_Wirte">
                    <button className={style.writeBtn}><strong>전자 결재 작성</strong></button>
                </Link>
            </div>


            <div className={style.btndiv}>
                <Link to="Sign_Main"></Link>
                <button className={style.btn}>전자결제 홈</button>
            </div>

            <div className={style.btndiv}>
                <Link to="Sign_Wirte"></Link>
                <button className={style.btn}>새결제 진행</button>
            </div>

            <div className={style.btndiv}>
                <Link to="Sign_Wait"></Link>
                <button className={style.btn}>결제대기중</button>
            </div>

            <div className={style.btndiv}>
                <Link to="Sign_Progress"></Link>
                <button className={style.btn}>진행중문서</button>
            </div>

            <div className={style.btndiv}>
                <Link to="Sign_Complete"></Link>
                <button className={style.btn}>완료문서</button>
            </div>


        </div>
    );
};

export default SignSlide;