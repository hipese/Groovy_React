import styles from "./ToDoListMain.module.css";
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { MemberContext } from "../../Groovy/Groovy";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from '@fortawesome/free-solid-svg-icons';

const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    borderRadius: "0%",

});
const ProfileContainer = styled("div")({
    maxWidth: "70px",
    maxHeight: "70px",
});

const ToDoListMain = () => {
  const members = useContext(MemberContext);

  return (
    <div className={styles.tdl}>
      <div className={styles.tdlMain}>
        {members.member.profile_image ? <ProfileContainer>
          <StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" />
          </ProfileContainer> : <ProfileContainer>
          <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile"/>
        </ProfileContainer>} <div className={styles.tdlMaintitle}>{members.member.name}<span>'s Workspace</span><span className={styles.muat}><FontAwesomeIcon icon={faKey} /> Private</span></div>
      </div>
      <div className={styles.tdlBoards}>
        <div className={styles.tdlBoardsTitle}>Boards</div>
        <div className={styles.tdlInsert}>df</div>
      </div>
    </div>
  );
};

export default ToDoListMain;
