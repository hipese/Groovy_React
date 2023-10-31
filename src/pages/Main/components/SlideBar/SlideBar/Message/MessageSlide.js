import style from "./MessageSlide.module.css";

const MessageSlide = () => {
    return (
        <div className={style.MessageSlide}>
            <button className={style.btn}>
            <strong>+</strong> 작성하기
          </button>
        </div>
    );
};

export default MessageSlide;