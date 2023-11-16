import React, { Component, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./MypageDropDown.module.css"
import { MemberContext } from "../../../../Groovy/Groovy";
import { LoginContext } from "../../../../../App";
import axios from "axios";



// MypageDropDown 컴포넌트 정의
const MypageDropDown = ({ closeDropdown }) => {


    const members = useContext(MemberContext);
    const { loginID, setLoginID }=useContext(LoginContext)
    const navigate = useNavigate();

    const handleMypage=(event)=>{
        closeDropdown(event);
        navigate("mypagelist");
    }

    const handleOutout=()=>{
        console.log(loginID)

        const confirmLogout = window.confirm("로그아웃하시겠습니까?");
        if(confirmLogout){

            axios.post("/auth/logout").then(resp=>{
                console.log(resp.data);
                setLoginID("");
                navigate("/");
            })

        }
    }

    return (
        <div className={style.container}>
            <div className={style.buttonDiv}>
                <button className={style.btn} onClick={handleMypage}>  프로필 설정</button>
                <button className={style.btn} onClick={handleOutout}>로그아웃</button>
            </div>
        </div>
    );
}
export default MypageDropDown;
