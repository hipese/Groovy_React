import { Link } from "react-router-dom";
import style from "./SurveySlide.module.css";
import { Typography } from "@mui/material";

const SurveySlide = () => {
    return (
        <div className={style.SurveySlide}>
            <Link to="/Groovy/survey/survey_write"> 
                <button className={style.btn}>
                    <Typography sx={{color:"white"}}>
                        <strong>+</strong> 설문 작성하기
                    </Typography>
                </button>
            </Link>
            <Link to="/Groovy/survey"> 
                <button className={style.btn}>
                    <Typography sx={{color:"white"}}>
                        설문조사 목록
                    </Typography>
                </button>
            </Link>
            <Link to="/Groovy/survey/result_list"> 
                <button className={style.btn}>
                    <Typography sx={{color:"white"}}>
                        설문결과 목록
                    </Typography>
                </button>
            </Link>
        </div>
    );
};

export default SurveySlide;