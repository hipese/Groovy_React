import React, { Component } from "react";
import { Link } from "react-router-dom";

// MypageDropDown 컴포넌트 정의
const MypageDropDown=()=>{
    return(
        <div className="">
              <Link to="mypagelist">
                    여기 누르면 이동해요?
              </Link>
        </div>
    );
}
export default MypageDropDown;
