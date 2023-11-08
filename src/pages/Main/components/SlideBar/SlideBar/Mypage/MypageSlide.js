import style from "./MypageSlide.module.css";
import { Link } from "react-router-dom"

const MypageSlide = () => {
    return (
        <div className={style.SignSlide}>

            <div className={style.btndiv}>
                <Link to="update">
                    <button className={style.writeBtn}><strong>돌아가기</strong></button>
                </Link>
            </div>

        </div>
    );
};

export default MypageSlide;