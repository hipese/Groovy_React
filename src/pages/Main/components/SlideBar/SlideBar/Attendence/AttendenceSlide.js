import style from "./AttendenceSlide.module.css";
import { Link } from "react-router-dom";

const AttendenceSlide = () => {
    return (
        <div className={style.AttendenceSlide}>
            <div className={style.btndiv}>
                <Link to="/Groovy">
                    <button className={style.writeBtn}>
                        <strong>홈</strong>
                    </button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="">
                    <button className={style.btn}>
                        근태관리 홈
                    </button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <button className={style.btn}>
                    연차신청하기
                </button>
            </div>

            <div className={style.btndiv}>
                <Link to="attendenceStatus">
                    <button className={style.btn}>
                        출퇴근현황
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default AttendenceSlide;