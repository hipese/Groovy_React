import React, {  useContext } from "react";
import {  useNavigate } from "react-router-dom";
import style from "./MypageDropDown.module.css"
import { LoginContext } from "../../../../../App";
import axios from "axios";



// MypageDropDown 컴포넌트 정의
const MypageDropDown = ({ closeDropdown }) => {


    const { loginID, setLoginID }=useContext(LoginContext)
    const navigate = useNavigate();

    const handleMypage=(event)=>{
        closeDropdown(event);
        navigate("mypagelist");
    }

    const handleOutout=()=>{
        const confirmLogout = window.confirm("로그아웃하시겠습니까?");
        if(confirmLogout){

            axios.post("/auth/logout").then(resp=>{
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
