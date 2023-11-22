import { Link } from "react-router-dom";
import style from "./ContactSlide.module.css";

const ContactSlide = () => {

    return (
        <div>

            <Link to="/Groovy/contacts">
                <button className={style.btn1}>
                    <strong>회사 주소록</strong>
                </button>
            </Link>



            <Link to="/Groovy/contacts/favorite">
                <button className={style.btn}>
                    즐겨찾기
                </button>
            </Link>


            <Link to="/Groovy/contacts/groupcontact">
                <button className={style.btn}>
                    소속 주소록
                </button>
            </Link>


            <Link to="/Groovy/contacts/externalcontact">
                <button className={style.btn}>
                    외부 주소록
                </button>
            </Link>

        </div>
    );
};

export default ContactSlide;