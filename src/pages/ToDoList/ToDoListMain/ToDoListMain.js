import styles from "./ToDoListMain.module.css";
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { MemberContext } from "../../Groovy/Groovy";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Modal from "../ToDoListModal/ToDoListModal";

const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    borderRadius: "0%",

});
const ProfileContainer = styled("div")({
    maxWidth: "70px",
    maxHeight: "70px",
});

const StarIcon = ({onClick}) => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => {
    setIsFilled(!isFilled);
    if(onClick) onClick();
  };
  const strokeColor = isFilled ? "#FFD700" : "#000";
  const fillClass = isFilled ? styles.ratingStarFilled : styles.ratingStarNotFilled;


  return (
    <label htmlFor="rating-2" className={styles.ratingLabel} onClick={toggleFill}>
      <svg className={styles.ratingStar} width="15px" height="15px" viewBox="0 0 32 32" aria-hidden="true">
        <g transform="translate(16,16)">
          <circle className={styles.ratingStarRing} fill="none" stroke="#000" strokeWidth="16" r="8" transform="scale(0)" />
        </g>
        <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(16,16) rotate(180)">
            <polygon className={styles.ratingStarStroke} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
            <polygon className={`${styles.ratingStarFill} ${fillClass}`} points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" />
          </g>
          <g transform="translate(16,16)" strokeDasharray="12 12" strokeDashoffset="12">
            <polyline className={styles.ratingStarLine} transform="rotate(0)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(72)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(144)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(216)" points="0 4,0 16" />
            <polyline className={styles.ratingStarLine} transform="rotate(288)" points="0 4,0 16" />
          </g>
        </g>
      </svg>
    </label>
  );
};

const ToDoListMain = () => {
  const members = useContext(MemberContext);
  const [starActive, setStarActive] = useState(false); // 즐겨찾기 활성화 여부
  const toggleStar = () => {
    setStarActive(!starActive);
  }
  const [showModal, setShowModal] = useState(false); // 모달창 활성화 여부
  const toggleModal = () => {
    setShowModal(!showModal);
  }



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
        <ul className={styles.tdlul}>
          <li className={styles.tdlli}>
            <div className={styles.tdlInsert} onClick={toggleModal}>Create New Board </div>
          </li>
          <li className={styles.tdlli}>
            <div className={styles.tdlInsert}>Create New Board <div className={`${styles.starimg} ${starActive ? styles.starActive : ''}`}><StarIcon onClick={toggleStar} /></div></div>
          </li>
          <li className={styles.tdlli}>
            <div className={styles.tdlInsert}>Create New Board</div>
          </li>
          <li className={styles.tdlli}>
            <div className={styles.tdlInsert}>Create New Board</div>
          </li>
          <li className={styles.tdlli}>
            <div className={styles.tdlInsert}>Create New Board</div>
          </li>
        </ul>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ToDoListMain;
