import { Link } from "react-router-dom";
import style from "./MessageSlide.module.css";

const MessageSlide = () => {
    return (
        <div>
            <Link to="/Groovy/message/create">
                <button className={style.btn1}>
                    <strong >+ 새 메시지 생성</strong>
                </button>
            </Link>

            <Link to="/Groovy/message">
                <button className={style.btn}>
                    메시지 목록
                </button>
            </Link>
        </div>
    );
};

export default MessageSlide;