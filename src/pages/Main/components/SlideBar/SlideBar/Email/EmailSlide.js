import { Link } from "react-router-dom";
import style from "./EmailSlide.module.css";

const BoardSlide = () => {
    return (
        <div className={style.CalendarSlide}>
            <Link to="/groovy/mail/write">
                <button className={style.btn1}>
                    <strong>+</strong> 메일 쓰기
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
            <Link to="/groovy/mail/temp">
                <button className={style.btn}>
                    임시보관함
                </button>
            </Link>
            <Link to="/groovy/mail/tome">
                <button className={style.btn}>
                    내게쓴메일함
                </button>
            </Link>
            <Link to="/groovy/mail/spam">
                <button className={style.btn}>
                    스팸메일함
                </button>
            </Link>
        </div>
    );
};

export default BoardSlide;
