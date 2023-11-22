import style from "./MypageSlide.module.css";
import { Link, useNavigate } from "react-router-dom"

const MypageSlide = () => {

    const navigat = useNavigate();


    const handleHome = () => {
        navigat("/Groovy/dashboard");
    }


    return (
        <div>
            <button className={style.writeBtn} onClick={handleHome}><strong>돌아가기</strong></button>
        </div>
    );
};

export default MypageSlide;