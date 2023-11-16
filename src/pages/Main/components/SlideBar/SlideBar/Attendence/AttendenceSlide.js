import style from "./AttendenceSlide.module.css";
import { Link } from "react-router-dom";

const AttendenceSlide = () => {
    return (
        <div className={style.AttendenceSlide}>
            <div className={style.btndiv}>
                <Link to="/Groovy/dashboard">
                    <button className={style.btn}>
                        홈
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
                <Link to="attendenceWrite">
                    <button className={style.btn}>
                        연차신청하기
                    </button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="attendenceProgress">
                    <button className={style.btn}>
                        휴가신청처리
                    </button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="attendenceWait">
                    <button className={style.btn}>
                        휴가신청진행중
                    </button>
                </Link>
            </div>

            <div className={style.btndiv}>
                <Link to="attendenceComplete">
                    <button className={style.btn}>
                        휴가신청완료
                    </button>
                </Link>
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