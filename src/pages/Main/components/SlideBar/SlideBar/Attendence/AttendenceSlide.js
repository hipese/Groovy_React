import style from "./AttendenceSlide.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const AttendenceSlide = () => {

    const [isHidden, setIsHidden] = useState(false);

    const handleHid = () => {
        setIsHidden(!isHidden);
    }

    const [isHidden2, setIsHidden2] = useState(false);

    const handleHid2 = () => {
        setIsHidden2(!isHidden2);
    }

    return (
        <div>

            <Link to="attendenceWrite">
                <button className={style.btn1}>
                    <strong>+ 연차신청하기</strong>
                </button>
            </Link>

            <button className={style.btn2} onClick={handleHid2}>
                근태 관리
                <img src="/assets/down.svg" alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden2 && (
                <>
                    <Link to="">
                        <button className={style.btn}>
                            근태관리 홈
                        </button>
                    </Link>
                    <Link to="attendenceStatus">
                        <button className={style.btn}>
                            출퇴근현황
                        </button>
                    </Link>
                </>
            )}

            <button className={style.btn2} onClick={handleHid}>
                휴가 관리
                <img src="/assets/down.svg" alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <Link to="attendenceProgress">
                        <button className={style.btn}>
                            휴가신청처리
                        </button>
                    </Link>
                    <Link to="attendenceWait">
                        <button className={style.btn}>
                            휴가신청진행중
                        </button>
                    </Link>
                    <Link to="attendenceComplete">
                        <button className={style.btn}>
                            휴가신청완료
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default AttendenceSlide;