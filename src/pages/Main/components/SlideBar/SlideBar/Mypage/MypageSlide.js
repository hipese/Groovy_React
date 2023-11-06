import style from "./MypageSlide.module.css";
import { Link } from "react-router-dom"

const MypageSlide = () => {
    return (
        <div className={style.SignSlide}>

            <div className={style.btndiv}>
                <Link to="update">
                    <button className={style.writeBtn}><strong>마이페이지 수정</strong></button>
                </Link>
            </div>


            <div className={style.btndiv}>
                <Link to="">
                    <button className={style.btn}>마이페이지 홈</button>
                </Link>
            </div>


        </div>
    );
};

export default MypageSlide;