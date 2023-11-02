import style from "./EmailSlide.module.css";

const EmailSlide = () => {
    return (
        <div className={style.EmailSlide}>
            <button className={style.btn}>
            <strong>+</strong> 작성하기
          </button>
        </div>
    );
};

export default EmailSlide;