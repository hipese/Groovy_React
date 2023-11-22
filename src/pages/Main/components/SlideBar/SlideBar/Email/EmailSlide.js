import { Link } from "react-router-dom";
import style from "./EmailSlide.module.css";

const EmailSlide = () => {
    return (
        <div>
            <Link to="/groovy/mail/write">
                <button className={style.btn1}>
                    <strong>+ 메일 쓰기</strong> 
                </button>
            </Link>
            <Link to="/groovy/mail">
                <button className={style.btn}>
                    받은메일함
                </button>
            </Link>
            <Link to="/groovy/mail/sent">
                <button className={style.btn}>
                    보낸메일함
                </button>
            </Link>
            <Link to="/groovy/mail/tome">
                <button className={style.btn}>
                    내게쓴메일함
                </button>
            </Link>
            <Link to="/groovy/mail/waste">
                <button className={style.btn}>
                    휴지통
                </button>
            </Link>
        </div>
    );
};

export default EmailSlide;
