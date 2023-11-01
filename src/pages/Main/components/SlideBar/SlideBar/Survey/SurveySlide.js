import style from "./SurveySlide.module.css";

const SurveySlide = () => {
    return (
        <div className={style.SurveySlide}>
            <button className={style.btn}>
            <strong>+</strong> 설문 작성하기
          </button>
        </div>
    );
};

export default SurveySlide;