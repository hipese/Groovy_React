import { useContext, useState,forwardRef } from "react";
import style from "./UpdateModal.module.css"
import { MemberContext } from "../../../../../Groovy/Groovy";
import axios from "axios";


const formatContact = (contact) => {
    // 전화번호가 11자리인 경우에만 포매팅을 적용합니다.
    if (contact && contact.length === 11) {
        return `${contact.slice(0, 3)}-${contact.slice(3, 7)}-${contact.slice(7)}`;
    }
    // 그 외의 경우는 원본 전화번호를 반환합니다.
    return contact;
};


const UpdateContact = forwardRef((props,ref) => {
    
    const { onClose } = props; 
    const members = useContext(MemberContext)

    const [contact, setContact] = useState(members.member.contact || "");

    const handleChangeContact = (e) => {
        const { value } = e.target;
        // 입력값이 숫자만 포함되어 있는지 확인합니다.
        if (value === '' || /^[0-9\b]+$/.test(value)&&value.length<=11) {
            setContact(value);
        }
        // 숫자가 아닌 다른 값이 입력되면 상태를 업데이트하지 않습니다.
    }

    const handleConfirm = () => {

        if(contact.length<10){
            alert("전화번호 형식으 올바르지 않습니다.")
            return;
        }

        // 멤버 상태를 업데이트하는 로직
        axios.put(`/api/member/ContactUpdate/${contact}`).then(resp => {
            onClose();
        }).catch(error => {
            // 오류 처리 로직
        });

        members.setMember(prev => ({ ...prev, contact: contact }));
    };

    return (
        <div className={style.modalContent}>
            <div className={style.headerTextDiv}>
                변경전 전화번호
            </div>
            <div className={style.contentsDiv}>
                {formatContact(members.member.contact)}
            </div>
            <div className={style.headerTextDiv}>
                변경 후 전화번호
            </div>
            <div className={style.inputDiv}>
                <input className={style.inputs} type="text" placeholder="전화번호를 입력하세요(-는 입력하지 마세요)" name="contact" value={contact} onChange={handleChangeContact} />
            </div>
            <div className={style.contentsDiv}>
                {formatContact(contact)}
            </div>
            <div className={style.btnDiv}>
                <button className={style.btn} onClick={handleConfirm}>확인</button>
                <button className={style.btn} onClick={() => { onClose() }}>취소</button>
            </div>
        </div>
    );
});
export default UpdateContact;