import { Route, Routes } from "react-router-dom";
import Sign_Main from "../Sign_Main/Sign_Main";
import Sign_Wait from "../Sign_Wait/Sign_Wait";
import Sign_Complete from "../Sign_Complete/Sign_Complete";
import Sign_Progress from "../Sign_Progress/Sign_Progress";
import Sign_Write from "../Sign_Write/Sign_Write";
import Sign_Detail from "../Sign_Detail/Sign_Detail";
import { createContext, useState } from "react";
import Sign_Review from "../Sign_Review/Sign_Review";
import Sign_SeniorReviewWrite from "../Sign_SeniorReview/Sign_SeniorReviewWrite";


// const Receiver=createContext(); 나중에 사용할거면 만들어서 ㄱㄱ


const SignM=()=>{
  return(
    <Sign_Main/>
  );
}
const SignWrt=()=>{
  return(
   <Sign_Write/>
  );
}

const SignWa=()=>{
  return(
    <Sign_Wait/>
  );
}

const SignP=()=>{
  return(
    <Sign_Progress/>
  );
}

const SignC=()=>{
  return(
    <Sign_Complete/>
  );
}

const Sign_List = () => {

  return (
    <Routes>
      <Route path="/" element={<SignM/>} />
      <Route path="/write" element={<SignWrt/> } />
      <Route path="/review" element={<Sign_Review/> } />
      <Route path="/wait" element={<SignWa />} />
      <Route path="/progress" element={<SignP />} />
      <Route path="/complete" element={<SignC />} />
      <Route path="/detail/:seq" element={<Sign_Detail />} />
      <Route path="/Sign_SeniorReviewWrite/:seq" element={<Sign_SeniorReviewWrite />} />
    </Routes>
  );
};

export default Sign_List;