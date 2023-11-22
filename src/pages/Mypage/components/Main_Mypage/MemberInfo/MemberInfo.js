import { useContext, useEffect, useState } from "react"
import style from "./MemberInfo.module.css"
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import ImageChange from "./ImageChange/ImageChange";
import { MemberContext, VacationContext } from "../../../../Groovy/Groovy";
import UpdateContact from "./Update/UpdateContact";
import UpdateEmail from "./Update/UpdateEmail";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
    width: "120px",
    height: "120px",
});



const MemberInfo = () => {


    const members = useContext(MemberContext);
    const { myVacation, setMyVacation } = useContext(VacationContext);

    const [openModal, setOpenModal] = useState(false); // 모달 상태

    const [editingField, setEditingField] = useState(null);

    const [attendenceCount, setAttendenceCount] = useState();
    const [attendence, setAttendence] = useState();


    console.log(attendence);

    useEffect(() => {

        axios.get(`/api/attend/attendenceCount`).then(resp => {
            setAttendenceCount(resp.data);
        })

        axios.get(`/api/attend/myAttendence`).then(resp => {
            setAttendence(resp.data);
        })
    }, [])

    useEffect(() => {

        axios.get(`/api/vacation/myVacation`)
            .then(resp => {
                setMyVacation(resp.data);
            })
    }, [])

    const handleEdit = (field) => {
        setEditingField(field); // 수정 중인 필드 설정
        setOpenModal(true); // 모달 열기
    };


    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingField(null); // 수정 중인 필드 상태를 초기화
    };

    return (
        <div className={style.memberInfo}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 800,
                        height: 450,
                    },
                }}
            >
                <Paper elevation={3}>
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
                                <div className={style.emailTextdiv}>
                                    {members.member.email}
                                </div>
                                <div className={style.emailbtndiv} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button className={style.emailbtn} variant="contained" onClick={() => handleEdit('email')}>수정</Button>
                                    <Modal
                                        open={openModal && editingField === 'email'}
                                        onClose={handleCloseModal}
                                    >
                                        <UpdateEmail onClose={handleCloseModal} />
                                    </Modal>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={style.contentsDivs}>

                        <div className={style.contentsdiv}>
                            <div className={style.textdiv}>
                                연락처
                            </div>
                            <div className={style.contentText}>
                                {members.member.contact}
                            </div>
                            <div className={style.btndiv}>
                                <Button className={style.btn} variant="contained" onClick={() => handleEdit('contact')}>수정</Button>
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
                                부서
                            </div>

                            <div className={style.content}>
                                {members.member.group_name}
                            </div>
                        </div>

                        <div className={style.contentsdiv}>
                            <div className={style.textdiv}>
                                직책
                            </div>

                            <div className={style.content}>
                                {members.member.position}
                            </div>
                        </div>

                        <div className={style.contentsdiv}>
                            <div className={style.textdiv}>
                                근무일수
                            </div>

                            <div className={style.content}>
                                {attendenceCount}일
                            </div>

                        </div>

                        <div className={style.contentsdiv}>
                            <div className={style.textdiv}>
                                출근현황
                            </div>

                            <div className={style.alterdiv}>
                                {attendence ? (
                                    attendence.workstart && attendence.workend ? (
                                        <Stack sx={{ width: '50%' }} spacing={2}>
                                            <Alert variant="outlined" severity="error">
                                                퇴근했습니다.
                                            </Alert>
                                        </Stack>
                                    ) : attendence.workstart ? (
                                        <Stack sx={{ width: '50%' }} spacing={2} >
                                            <Alert variant="outlined" severity="success">
                                                근무중
                                            </Alert>
                                        </Stack>
                                    ) : (
                                        <Stack sx={{ width: '50%' }} spacing={2}>
                                            <Alert variant="outlined" severity="warning">
                                                퇴근을 해주세요
                                            </Alert>
                                        </Stack>
                                    )
                                ) : (
                                    // attendence가 undefined인 경우 로딩 상태나 빈 화면을 표시할 수 있습니다.
                                    <Stack sx={{ width: '50%' }} spacing={2}>
                                       <Alert variant="outlined" severity="warning">
                                                출근을 해주세요
                                        </Alert>
                                    </Stack>
                                )}
                            </div>

                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    );
}

export default MemberInfo;