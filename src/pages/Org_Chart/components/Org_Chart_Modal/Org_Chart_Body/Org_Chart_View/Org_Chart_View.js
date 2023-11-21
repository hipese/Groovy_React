import { useEffect } from "react";
import style from "./Org_Chart_View.module.css"
import { Avatar, styled } from "@mui/material";




const StyledAvatar = styled(Avatar)({
    width: "200px",
    height: "200px",
    border: "1px solid #000000",

    "&:hover": {
        opacity: "0.8",
        cursor: "pointer",
    },
});
const ProfileContainer = styled("div")({
    display: 'flex',      // Flexbox 레이아웃 사용
    justifyContent: 'center', // 가로 방향 가운데 정렬
    alignItems: 'center', // 세로 방향 가운데 정렬
    width: '100%',       // 부모 컨테이너의 전체 너비
    height: '100%',      // 부모 컨테이너의 전체 높이
});


const Org_Chart_View = ({ approver, setApprover, setIsSend, selectedRow, selectMemberdetail, isSend }) => {

    const handleInvalidApprover = () => {
        alert("결재시에는 자신보다 직급이 같거나 높은 맴버를 선택해주세요")
        return;
    };

    useEffect(() => {
        // isSend가 true이고, approver.id가 없는 경우에만 실행
        if (isSend === true) {
            handleInvalidApprover();
            setIsSend();
            setApprover({});
        }
    }, [isSend, approver.id]);


    return (
        <div className={style.view_div}>

            {isSend === false && approver.id && (
                // isSend가 false이고 approver.id가 없을 때 렌더링할 JSX
                <div className={style.view_div}>
                    <div className={style.title}>
                        {approver.group_name ? `${approver.group_name} ${approver.position}` : `${approver.position}`}
                    </div>
                    <div className={style.imageDiv}>
                        {selectMemberdetail.profile_image ? (
                            <ProfileContainer>
                                <StyledAvatar src={`/profiles/${selectMemberdetail.profile_image}`} alt="profile" />
                            </ProfileContainer>
                        ) : (
                            <ProfileContainer>
                                <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" />
                            </ProfileContainer>
                        )}
                    </div>
                    <div className={style.footer}>
                        <div className={style.email}>
                            {selectMemberdetail.email}
                        </div>
                        <div className={style.idname}>
                            {`${approver.id} ${approver.name}`}
                        </div>
                    </div>
                </div>
            )}


            {isSend === undefined && approver.id && (
                (
                    <div className={style.view_div}>
                        <div className={style.title}>
                            {approver.group_name ? `${approver.group_name} ${approver.position}` : `${approver.position}`}
                        </div>
                        <div className={style.imageDiv}>
                            {selectMemberdetail.profile_image ? (
                                <ProfileContainer>
                                    <StyledAvatar src={`/profiles/${selectMemberdetail.profile_image}`} alt="profile" />
                                </ProfileContainer>
                            ) : (
                                <ProfileContainer>
                                    <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" />
                                </ProfileContainer>
                            )}
                        </div>
                        <div className={style.footer}>
                            <div className={style.email}>
                                {selectMemberdetail.email}
                            </div>
                            <div className={style.idname}>
                                {`${approver.id} ${approver.name}`}
                            </div>
                        </div>
                    </div>

                )
            )}

            {approver.id === undefined && selectedRow===null&& (<div className={style.null}>
                결재자를 선택해주세요
            </div>)}

        </div>
    );
}

export default Org_Chart_View;