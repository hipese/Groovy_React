import { useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
import img from "./assets/쥐돌이.png"
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import ImageChange from "./ImageChange/ImageChange";

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
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // 수정모드 
    const [isEdit, setEdit] = useState(false);

    const [member, setMember] = useState({});

    // 수정시 데이터를 임시로 저장하는 변수
    const [backUpMember, setBackUpMember] = useState({});


    useEffect(() => {
        axios.get("/api/member").then(resp => {
            console.log(resp.data);
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
            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>
                        <ProfileContainer>
                            <StyledAvatar src={img} alt="profile" onClick={handleOpenModal} />
                        </ProfileContainer>

                        <Modal
                            open={openModal} // 모달의 열림 상태를 관리하는 open 속성
                            onClose={handleCloseModal} // 모달을 닫는 함수를 지정
                        ><ImageChange/></Modal>
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