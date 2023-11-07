import { useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import ImageChange from "./ImageChange/ImageChange";


//C:\ReactWorkSpace\groovy\src\assets

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
    width: "75px",
    height: "75px",
});



const MemberInfo = () => {    
   
    
    const [openModal, setOpenModal] = useState(false); // 모달 상태

    // 모달을 열고 닫는 함수들
    const handleOpenModal = () => {
        console.log(`/assets/${member.profile_image}`);
        console.log("Opening modal");
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        console.log("Closing modal");
        setOpenModal(false);
    };

    // 수정모드 
    const [isEdit, setEdit] = useState(false);

    const [member, setMember] = useState({});

    // 수정시 데이터를 임시로 저장하는 변수
    const [backUpMember, setBackUpMember] = useState({});


    useEffect(() => {
        axios.get("/api/member").then(resp => {
            setMember(resp.data)
            setBackUpMember(resp.data);
        });
    }, []);

    const handleUpdate = () => {

    }

    // 수정 변경 취소시 데이터를 되돌리는 코드
    const handCancel = () => {

        setMember(backUpMember);


        setEdit(false);
    }

    return (
        <div className={style.contanier}>
            <div>
                ssss
            <img src={`/assets/${member.profile_image}`} alt="" />
            </div>
           
            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>

                        {/* profile_image가 null이면 기본으로 설정된 이미지를 아니면 profile이미지로 설정한다. */}
                        {member.profile_image ? <ProfileContainer>
                            <StyledAvatar src={`/assets/이사.png`} alt="profile" onClick={handleOpenModal} />
                        </ProfileContainer> : <ProfileContainer>
                            <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" onClick={handleOpenModal} />
                        </ProfileContainer>}

                        <Modal
                            open={openModal} // 모달의 열림 상태를 관리하는 open 속성
                            onClose={handleCloseModal} // 모달을 닫는 함수를 지정
                        ><ImageChange src={`/assets/${member.profile_image}`} onClose={handleCloseModal} /></Modal>
                    </div>

                    <div className={style.contentsbox}>

                        <div className={style.name}>
                            {member.name}
                        </div>

                        <div className={style.email}>
                            {member.email}
                        </div>

                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.contact}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.group_name}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.position}
                    </div>
                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={handleUpdate}>수정</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MemberInfo;