import { Link } from "react-router-dom";
import style from "./MessageSlide.module.css";

const MessageSlide = () => {
    return (
        <div>
            <div className={style.mainbtn_container}>
                <Link to="/Groovy/message/create">
                    <button className={style.mainbtn}>
                        <strong className={style.strong_main}>+ 새 메시지 생성</strong>
                    </button>
                </Link>
            </div>
            <div className={style.subbtn_container}>
                <div className={style.subbtn_wrapper}>
                    <Link to="/Groovy/message">
                        <button className={style.subbtn}>
                            메시지 목록
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MessageSlide;