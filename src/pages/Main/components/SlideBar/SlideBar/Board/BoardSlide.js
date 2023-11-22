import { Link } from "react-router-dom";
import style from "./BoardSlide.module.css";
import down from "./assets/down.svg";
import { useState, useContext } from "react";
import { MemberContext } from '../../../../../Groovy/Groovy';

const BoardSlide = () => {
    const { member } = useContext(MemberContext);

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
            <Link to="/groovy/board/write">
                <button className={style.btn1}>
                    <strong>+ 글 작성하기</strong>
                </button>
            </Link>
            <Link to="/groovy/board">
                <button className={style.btn}>
                    최근 게시물
                </button>
            </Link>
            <button className={style.btn2} onClick={handleHid}>
                전사 게시판
                <img src={down} alt="" width={"20px"} height={"15px"} />
            </button>
            {isHidden && (
                <>
                    <Link to="/groovy/board/com">
                        <button className={style.btn}>
                            사내 공지
                        </button>
                    </Link>
                    <Link to="/groovy/board/comfree">
                        <button className={style.btn}>
                            자유 게시판
                        </button>
                    </Link>
                </>
            )}
            {member.group_name !== null && (
                <>
                    <button className={style.btn2} onClick={handleHid2}>
                        부서 게시판
                        <img src={down} alt="" width={"20px"} height={"15px"} />
                    </button>
                </>
            )}
            {isHidden2 && (
                <>
                    <Link to="/groovy/board/dept">
                        <button className={style.btn}>
                            부서 공지
                        </button>
                    </Link>
                    <Link to="/groovy/board/deptfree">
                        <button className={style.btn}>
                            자유 게시판
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default BoardSlide;
