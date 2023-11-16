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


const Org_Chart_View = ({ approver, selectMemberdetail }) => {
    return (
        <div className={style.view_div}>

            {/* {isLoading ? (
                <div>Loading...</div> // 로딩 중일 때 표시할 메시지
            ) : (
                나중에 로딩필요하면 만들어라
            )} */}

            {approver && !approver.id ? <div className={style.null}>
                결재자를 선택해주세요
            </div> : <div className={style.view_div}>
                <div className={style.title}>
                    {approver.group_name ? `${approver.group_name} ${approver.position}` : `${approver.position}`}
                </div>
                <div className={style.imageDiv}>
                    {selectMemberdetail.profile_image ? <ProfileContainer>
                        <StyledAvatar src={`/profiles/${selectMemberdetail.profile_image}`} alt="profile" />
                    </ProfileContainer> : <ProfileContainer>
                        <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" />
                    </ProfileContainer>}
                </div>
                <div className={style.footer}>
                    <div className={style.email}>
                        {selectMemberdetail.email}
                    </div>
                    <div className={style.idname}>
                        {`${approver.id} ${approver.name}`}
                    </div>
                </div>
            </div>}

        </div>
    );
}

export default Org_Chart_View;