import BtnDiv from "./BtnDiv/BtnDiv";
import styles from "./ImageChange.module.css"
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import React, { useState,useRef,useContext } from 'react';
import { MemberContext } from "../../../../../Groovy/Groovy";


const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    border: "1px solid #000000",
    "&:hover": {
        opacity: "0.8",
        cursor: "pointer",
    },
});
const ProfileContainer = styled("div")({
    width: "240px",
    height: "240px",
});

const ImageChange = ({onClose}) => {

    const members=useContext(MemberContext);

    const [previewSrc, setPreviewSrc] = useState(null);// 미리보기를 위한 변수
    const [fileName, setFileName] = useState(""); // 파일 이름을 위한 상태

    const [cfile, setCfile] = useState(null); // 파일 이름을 위한 상태

    //파일 입력에 대한 참조 변수
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        // 파일이 선택되었는지 확인
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.type.match("image.*")) {
                //파일의 이름값을 저장
                setCfile(file);
                
                // FileReader를 사용하여 파일을 읽습니다.
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    // 읽기 작업이 완료되면 미리보기 URL을 상태에 저장합니다.
                    setPreviewSrc(loadEvent.target.result);
                };
                reader.readAsDataURL(file); // 파일의 내용을 읽어 데이터 URL로 변환합니다.
            }else{
                alert("이미지로 다시 선택해주세요")
                
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setFileName("");
                return ;
            }

        }
    };

    return (
        <div className={styles.modalContent}>
            <div className={styles.changeImageDiv}>
                <div className={styles.textDiv}>
                    변경 전 이미지
                </div>
                <div className={styles.imageDiv}>
                    <ProfileContainer>
                        <StyledAvatar src={members.profile_src} alt="profile" />
                    </ProfileContainer>
                </div>
            </div>

            <div className={styles.changeImageDiv}>
                <div className={styles.textDiv}>
                    변경 후 이미지
                </div>
                <div className={styles.imageDiv}>
                    <ProfileContainer>
                        <StyledAvatar src={previewSrc || members.profile_src} alt="profile" />
                    </ProfileContainer>
                </div>
            </div>

            <div className={styles.inputDiv}>
                <input type="file"  ref={fileInputRef} onChange={handleImageChange} />
            </div>

            <div className={styles.buttonDiv}>
                <BtnDiv cfile={cfile}  onClose={onClose} />
            </div>

        </div>
    );
}

export default ImageChange;