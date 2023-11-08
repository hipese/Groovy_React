import { useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
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

    const [editingField, setEditingField] = useState(null);

    const [profile_scr, setProfile_scr]=useState("");

    // 모달을 열고 닫는 함수들
    const handleOpenModal = () => {
        console.log(`/assets/${member.profile_image}`);
        console.log("Opening modal");
        console.log(`/assets/${encodeURIComponent(member.profile_image)}`)
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

    const [member, setMember] = useState({});

    // 수정시 데이터를 임시로 저장하는 변수
    const [backUpMember, setBackUpMember] = useState({});


    useEffect(() => {
        axios.get("/api/member").then(resp => {
            setMember(resp.data)
            setBackUpMember(resp.data);
            setProfile_scr(resp.data.profile_image)
        });
    }, []);


    return (
        <div className={style.contanier}>


            <div className={style.memberInfo}>


                <div className={style.infoHeader}>

                    <div className={style.imagebox}>

                        {/* profile_image가 null이면 기본으로 설정된 이미지를 아니면 profile이미지로 설정한다. */}
                        {member.profile_image ? <ProfileContainer>
                            <StyledAvatar src={`/profiles/${profile_scr}`} alt="profile" onClick={handleOpenModal} />
                        </ProfileContainer> : <ProfileContainer>
                            <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" onClick={handleOpenModal} />
                        </ProfileContainer>}
                        {member.profile_image ? <Modal
                            open={openModal} // 모달의 열림 상태를 관리하는 open 속성
                            onClose={handleCloseModal} // 모달을 닫는 함수를 지정
                        ><ImageChange src={`/profiles/${profile_scr}`} setProfile_scr={setProfile_scr}  onClose={handleCloseModal} /></Modal> : <Modal
                            open={openModal} // 모달의 열림 상태를 관리하는 open 속성
                            onClose={handleCloseModal} // 모달을 닫는 함수를 지정
                        ><ImageChange src={`/assets/Default_pfp.svg`} setProfile_scr={setProfile_scr} onClose={handleCloseModal} /></Modal>}

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
                        <button className={style.btn} onClick={() => handleEdit('contact')}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.group_name}
                    </div>

                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={() => handleEdit('group_name')}>수정</button>
                    </div>
                </div>

                <div className={style.contentsdiv}>
                    <div className={style.textdiv}>
                        {member.position}
                    </div>
                    <div className={style.btndiv}>
                        <button className={style.btn} onClick={() => handleEdit('position')}>수정</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MemberInfo;