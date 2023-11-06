import { Route, Routes } from "react-router-dom";
import Main_Mypage from  "../components/Main_Mypage/Main_Mypage"


const MypageM=()=>{
    return(
      <Main_Mypage/>
    );
  }


const Mypagelist = () => {
    return (
        <Routes>
            <Route path="/" element={<MypageM />} />
            <Route path="/update" element={<MypageM />} />
        </Routes>
    );
}

export default Mypagelist;