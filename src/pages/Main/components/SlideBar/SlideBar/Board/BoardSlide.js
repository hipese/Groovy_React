import { Link } from "react-router-dom";
import style from "./BoardSlide.module.css";
import down from "./assets/down.svg";
import { useState } from "react"; // useState 추가

const BoardSlide = () => {
    const [isHidden, setIsHidden] = useState(false);

    const handleHid = () => {
        setIsHidden(!isHidden);
    }

    const [isHidden2, setIsHidden2] = useState(false);

    const handleHid2 = () => {
        setIsHidden2(!isHidden2);
    }

    return (
        <div className={style.CalendarSlide}>
            <Link to="">
                <button className={style.btn1}>
                    <strong>+</strong> 글 작성하기
                </button>
            </Link>
            <Link to="">
                <button className={style.btn}>
                    최근 게시물
                </button>
            </Link>
            <Link to="">
                <button className={style.btn}>
                    중요 게시물
                </button>
            </Link>
            <button className={style.btn2} onClick={handleHid}>
                전사 게시판
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <Link to="">
                        <button className={style.btn}>
                            사내 공지
                        </button>
                    </Link>
                    <Link to="">
                        <button className={style.btn}>
                            자유 게시판
                        </button>
                    </Link>
                </>
            )}
            <button className={style.btn2} onClick={handleHid2}>
                부서 게시판
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden2 && (
                <>
                    <Link to="">
                        <button className={style.btn}>
                            부서 공지
                        </button>
                    </Link>
                    <Link to="">
                        <button className={style.btn}>
                            자유 게시판
                        </button>
                    </Link>
                </>
            )}
            <Link to="">
                <button className={style.btn}>
                    임시 저장함
                </button>
            </Link>
        </div>
    );
};

export default BoardSlide;
