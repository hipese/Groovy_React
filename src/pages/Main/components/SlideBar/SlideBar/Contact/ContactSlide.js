import style from "./ContactSlide.module.css";

const ContactSlide = () => {
    return (
        <div className={style.ContactSlide}>
            <button className={style.btn}>
            <strong>+</strong> 작성하기
          </button>
        </div>
    );
};

export default ContactSlide;