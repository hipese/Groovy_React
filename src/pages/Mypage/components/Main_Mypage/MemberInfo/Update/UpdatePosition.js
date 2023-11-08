import { useContext } from "react";
import style from "./UpdateModal.module.css"
import { MemberContext } from "../../../../../Groovy/Groovy";

const UpdatePosition = () => {


    const members = useContext(MemberContext)

    return (
        <div className={style.modalContent}>
            <div className={style.headerTextDiv}>
                변경 전 직책
            </div>
            <div className={style.contentsDiv}>
                {members.member.position}
            </div>
            <div className={style.headerTextDiv}>
                변경 후 직책
            </div>
            <div className={style.inputDiv}>
                <input className={style.inputs} type="text" placeholder="직책을 입력하세요" />
            </div>
            <div className={style.contentsDiv}>
                변경 후 직책 가져오기
            </div>
            <div className={style.btnDiv}>
                <button className={style.btn}>확인</button>
                <button className={style.btn} >취소</button>
            </div>
        </div>
    );
}
export default UpdatePosition;