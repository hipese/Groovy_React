import { useContext, useState, forwardRef } from "react";
import style from "./UpdateModal.module.css"
import { MemberContext } from "../../../../../Groovy/Groovy";
import axios from "axios";


const UpdateEmail = forwardRef((props, ref) => {
    const { onClose } = props;
    const members = useContext(MemberContext);

    const [email, setEmail] = useState(members.member.email || "");
    const [localPart, setLocalPart] = useState(members.member.email.split('@')[0] || ""); //@groovy제거 버전

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        const localPartRegex = /^[a-zA-Z0-9]+$/; // 영문자와 숫자만 허용
        const maxLength = 30; // 최대 글자 수

        if (value.length <= maxLength && (localPartRegex.test(value) || value === "")) {
            setEmail(`${value}@groovy.com`);
            setLocalPart(value);
        } else if (value.length > maxLength) {
            alert('이메일 앞부분은 30자를 넘길 수 없습니다.');
        } else {
            alert('특수 문자는 입력할 수 없습니다.');
        }
    }

    const handleConfirm = () => {

        if (!localPart.trim()) {
            alert('Email의 앞부분을 입력해주세요. (@groovy.com은 자동으로 추가됩니다)'); // 경고창 띄우기
            return;
        } else if (localPart.includes('@')) {
            alert('Email 앞부분에 @ 기호를 포함할 수 없습니다. (@groovy.com은 자동으로 추가됩니다)');
            return; // 함수를 여기서 종료
        }

        axios.put(`/api/member/emailUpdate/${email}`).then(resp => {
            console.log("email변경성공")
            onClose();
        }).catch(error => {
            // 오류 처리 로직
        });

        members.setMember(prev => ({ ...prev, email: email }));
    }

    return (
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
                <input className={style.inputs} type="text" name="email" value={localPart} placeholder="Email을 입력하세요.(@groovy는 빼고 입력)" onChange={handleChangeEmail} />
            </div>
            <div className={style.contentsDiv}>
                {`${localPart}@groovy.com`}
            </div>
            <div className={style.btnDiv}>
                <button className={style.btn} onClick={handleConfirm}>확인</button>
                <button className={style.btn} onClick={() => { onClose() }} >취소</button>
            </div>
        </div>
    );
});

export default UpdateEmail;
