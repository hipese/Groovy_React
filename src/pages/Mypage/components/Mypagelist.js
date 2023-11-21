import { Route, Routes } from "react-router-dom";
import style from "./MyPagelist.module.css"
import MypageIndex from "./Main_Mypage/MypageIndex/MypageIndex";
import MemberInfo from "./Main_Mypage/MemberInfo/MemberInfo";
import SurveyList from "./SurveyList/SurveyList";


const Mypagelist = () => {
  return (
    <div className={style.container}>
      <div className={style.contents}>
        <Routes>
          <Route path="/" element={<MemberInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default Mypagelist;