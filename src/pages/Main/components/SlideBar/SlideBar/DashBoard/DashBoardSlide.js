import { Link } from "react-router-dom";
import style from "./DashBoardSlide.module.css";

const DashBoardSlide = () => {
    return (
        <div>
            <div className={style.DashBoardSlide}>
                <Link to="/"><button className={style.btn}>
                Home
            </button></Link>
            </div>
            <div className={style.DashBoardSlide}>
                <Link to="project"><button className={style.btn}>
                프로젝트 보기
            </button></Link>
            </div>
            <div className={style.DashBoardSlide}>
            <Link to="notice"><button className={style.btn}>
                부서 내 소식 보기
            </button></Link>
            </div>
        </div>
        
        
    );
};

export default DashBoardSlide;