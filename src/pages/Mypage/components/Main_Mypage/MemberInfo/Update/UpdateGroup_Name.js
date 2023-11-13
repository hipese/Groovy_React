import { useContext } from "react";
import { MemberContext } from "../../../../../Groovy/Groovy";
import style from "./UpdateModal.module.css"
const UpdateGroup_Name = ({onClose}) => {

    const members = useContext(MemberContext)



    return (
        <div className={style.modalContent}>
            <div className={style.headerTextDiv}>
                변경 전 부서이름
            </div>
            <div className={style.contentsDiv}>
                {members.member.group_name}
            </div>
            <div className={style.headerTextDiv}>
                변경 후 부서이름
            </div>
            <div className={style.inputDiv}>
                <input className={style.inputs} type="text" placeholder="부서이름을 입력하세요" />
            </div>
            <div className={style.contentsDiv}>
                변경 후 부서이름 가져오기
            </div>
            <div className={style.btnDiv}>
                <button className={style.btn}>확인</button>
                <button className={style.btn} onClick={() => { onClose() }} >취소</button>
            </div>
        </div>
    );
}
export default UpdateGroup_Name;