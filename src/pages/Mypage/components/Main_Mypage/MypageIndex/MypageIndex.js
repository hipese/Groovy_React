import { useContext } from "react";
import { MemberContext } from "../../../../Groovy/Groovy";
import style from "./MypageIndex.module.css"
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
    width: "250px",
    height: "250px",
});

const MypageIndex = () => {

    const members = useContext(MemberContext);

    const handleEdit = () => {

    }

    return (
        <div className={style.container} >
            <div className={style.title}>
                <div>
                    <h1> 이미지 로고</h1>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.imageDiv}>
                    {members.member.profile_image ? <ProfileContainer>
                        <StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" onClick={() => handleEdit('imageChage')} />
                        <div className={style.nameText}>
                            {members.member.name}
                        </div>
                        <div className={style.email}>
                            {members.member.email}
                        </div>
                    </ProfileContainer> : <ProfileContainer>
                        <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" onClick={() => handleEdit('imageChage')} />
                    </ProfileContainer>}
                </div>

                <div className={style.alarmsDiv}>
                    <div className={style.alarms}>

                        <div className={style.alarmsText}>
                            새로운 결재, 메일, 채팅이 도착했습니다.
                        </div>

                        <div className={style.iconDiv}>
                            <FontAwesomeIcon icon={faBell} className={style.biggerIcon} />
                        </div>

                    </div>
                </div>

            </div>

            <div className={style.footer}>
                <ul>
                    <li><div><Link to="">내 프로필 수정</Link></div></li>
                    <li><div><Link to="surveyList">설문 목록</Link></div></li>
                    <li><div>이력관리</div></li>
                </ul>

                <div>
                    <div className={style.logoutText}>
                        로그 아웃
                    </div>
                    <div className={style.test}>
                        고객샌터
                    </div>
                </div>

                <div className={style.endTitle}>
                    배?너?
                </div>
            </div>
        </div>
    );
}

export default MypageIndex;