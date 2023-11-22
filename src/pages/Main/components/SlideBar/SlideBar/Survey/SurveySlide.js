import { Link } from "react-router-dom";
import style from "./SurveySlide.module.css";

const SurveySlide = () => {
    return (
        <div className={style.SurveySlide}>
            <Link to="/Groovy/survey/survey_write">
                <button className={style.btn1}>
                    <strong>+ 설문 작성하기</strong>
                </button>
            </Link>
            <Link to="/Groovy/survey">
                <button className={style.btn}>
                    설문조사 목록
                </button>
            </Link>
            <Link to="/Groovy/survey/result_list">
                <button className={style.btn}>
                    설문결과 목록
                </button>
            </Link>
        </div>
    );
};

export default SurveySlide;