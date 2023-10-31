import style from "./SignSlide.module.css";

const SignSlide = () => {
    return (
        <div className={style.SignSlide}>
            <button className={style.btn}>
            <strong>+</strong> 전자 결재
          </button>
        </div>
    );
};

export default SignSlide;