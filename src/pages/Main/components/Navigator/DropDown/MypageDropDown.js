import React, { Component } from "react";
import { Link } from "react-router-dom";

// MypageDropDown 컴포넌트 정의
const MypageDropDown = () => {
    return (
        <div className="">
            <div>
                email 적는 장소
            </div>
            <div>
                <div>
                    아바타 이미지 들어가는 장소
                </div>
                
                <div>
                    안녕하세요 누구누구님
                </div>

            </div>

            <Link to="mypagelist">
                여기 누르면 이동해요?
            </Link>
        </div>
    );
}
export default MypageDropDown;
