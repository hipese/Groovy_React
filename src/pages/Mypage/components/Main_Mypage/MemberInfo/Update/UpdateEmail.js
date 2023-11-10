import { useContext, useState } from "react";
import style from "./UpdateModal.module.css"
import { MemberContext } from "../../../../../Groovy/Groovy";
import axios from "axios";


const UpdateEmail=({onClose})=>{

    const members=useContext(MemberContext);

    const [email,setEmail]=useState(members.member.email||"");
    

    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    }

    const handleConfirm=()=>{
        axios.put(`/api/member/emailUpdate/${email}`).then(resp => {
            console.log("email변경성공")
            onClose();
        }).catch(error => {
            // 오류 처리 로직
        });

        members.setMember(prev => ({ ...prev, email: email }));
    }

    return(
        <div className={style.modalContent}>
            <div className={style.headerTextDiv}>
                변경 전 Email
            </div>
            <div className={style.contentsDiv}>
                {members.member.email}
            </div>
            <div className={style.headerTextDiv}>
                변경 후 Email
            </div>
            <div className={style.inputDiv}>
                <input className={style.inputs} type="text" name="email" value={email} placeholder="Email을 입력하세요." onChange={handleChangeEmail}/>
            </div>
            <div className={style.contentsDiv}>
                {email}
            </div>
            <div className={style.btnDiv}>
                <button className={style.btn} onClick={handleConfirm}>확인</button>
                <button className={style.btn} onClick={() => { onClose() }} >취소</button>
            </div>
        </div>
    );
}

export default UpdateEmail;
