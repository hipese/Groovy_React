import { useContext, useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import ImageChange from "./ImageChange/ImageChange";
import { MemberContext } from "../../../../Groovy/Groovy";
import UpdateContact from "./Update/UpdateContact";
import UpdateGroup_Name from "./Update/UpdateGroup_Name";
import UpdatePosition from "./Update/UpdatePosition";
import UpdateEmail from "./Update/UpdateEmail";


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

    const [editingField, setEditingField] = useState(null);

    const members = useContext(MemberContext);

    // 모달을 열고 닫는 함수들
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleEdit = (field) => {
        setEditingField(field); // 수정 중인 필드 설정
        setOpenModal(true); // 모달 열기
    };


    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingField(null); // 수정 중인 필드 상태를 초기화
    };


    // 수정모드 
    const [isEdit, setEdit] = useState(false);
    // 수정시 데이터를 임시로 저장하는 변수
    const [backUpMember, setBackUpMember] = useState({});


    return (
        <div className={style.contanier}>


            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>

                        {/* profile_image가 null이면 기본으로 설정된 이미지를 아니면 profile이미지로 설정한다. */}
                        {members.member.profile_image ? <ProfileContainer>
                            <StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" onClick={() => handleEdit('imageChage')} />
                        </ProfileContainer> : <ProfileContainer>
                            <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" onClick={() => handleEdit('imageChage')} />
                        </ProfileContainer>}
                        <Modal
                            open={openModal && editingField === 'imageChage'}
                            onClose={handleCloseModal} // 모달을 닫는 함수를 지정
                        ><ImageChange onClose={handleCloseModal} /></Modal>

                    </div>

                    <div className={style.contentsbox}>

                        <div className={style.name}>
                            {members.member.name}
                        </div>

                        <div className={style.email}>
                            <div className={style.textdiv}>
                                {members.member.email}
                            </div>
                            <div className={style.emailbtndiv}>
                                <button className={style.emailbtn} onClick={() => handleEdit('email')}>수정</button>
                                <Modal
                                    open={openModal && editingField === 'email'} // 'group_name' 필드를 편집할 때만 모달을 열기
                                    onClose={handleCloseModal}
                                >
                                    <UpdateEmail onClose={handleCloseModal} />
                                </Modal>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {members.member.contact}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={() => handleEdit('contact')}>수정</button>
                        <Modal
                            open={openModal && editingField === 'contact'} // 'group_name' 필드를 편집할 때만 모달을 열기
                            onClose={handleCloseModal}
                        >
                            <UpdateContact onClose={handleCloseModal} />
                        </Modal>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {members.member.group_name}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={() => handleEdit('group_name')}>수정</button>
                        <Modal
                            open={openModal && editingField === 'group_name'} // 'group_name' 필드를 편집할 때만 모달을 열기
                            onClose={handleCloseModal}
                        >
                            <UpdateGroup_Name />
                        </Modal>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {members.member.position}
                    </div>
                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={() => handleEdit('position')}>수정</button>
                        <Modal
                            open={openModal && editingField === 'position'} // 'group_name' 필드를 편집할 때만 모달을 열기
                            onClose={handleCloseModal}
                        >
                            <UpdatePosition />
                        </Modal>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MemberInfo;