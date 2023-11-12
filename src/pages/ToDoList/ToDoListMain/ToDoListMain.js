import styles from "./ToDoListMain.module.css";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MemberContext } from "../../Groovy/Groovy";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Modal from "../ToDoListModal/ToDoListModal";
import axios from "axios";
import { ToDoListContext } from "../../Groovy/Groovy";
import { List } from "reactstrap";
import { on } from "npm";

const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    borderRadius: "0%",

});
const ProfileContainer = styled("div")({
    maxWidth: "70px",
    maxHeight: "70px",
});

const StarIcon = ({id, isActive, onClick}) => {
  const strokeColor = isActive ? "#FFD700" : "white";
  const fillClass = isActive ? styles.ratingStarFilled : styles.ratingStarNotFilled;
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(id);
  }


  return (
    <label htmlFor="rating-2" className={styles.ratingLabel} onClick={handleClick}>
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
  const [showModal, setShowModal] = useState(false); // 모달창 활성화 여부
  const { todoList, setTodoList, ListAdded } = useContext(ToDoListContext);
  const toggleModal = () => {
    setShowModal(!showModal);
    ListAdded();
  }

  const toggleStar = async (id) => {
    const updatedList = todoList.map((todo, index) => {
      if (index === id) {
        return { ...todo, isActive: !todo.isActive };
      }
      return todo;
    });
    setTodoList(updatedList);

    const selectedTodo = updatedList[id];

    // isActive가 true로 설정된 경우 서버에 데이터 보내기
    if (selectedTodo.isActive) {
      const dataToSend = { parent_seq: selectedTodo.seq, id: selectedTodo.id };
      try {
        await axios.post("/api/tdlbookmark", dataToSend);
      } catch (error) {
        console.error("Error sending data to server:", error);
      }
    }
    else {
        try {
            await axios.delete(`/api/tdlbookmark/${selectedTodo.seq}`);
        } catch (error) {
            console.error("Error deleting data from server:", error);
        }
    }
};

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
          <Link to="ToDoListBoard">
          {todoList.map((todo, index) => {
            return (
              <li className={styles.tdlli} key={index}>
                <div className={styles.tdlDBInsert} style={{backgroundImage: `url(${todo.bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                  <div className={styles.tdltitle}>{todo.title}</div> 
                  <div className={`${styles.starimg} ${todo.isActive ? styles.starActive : ''}`}>
                    <StarIcon id={index} isActive={todo.isActive} onClick={toggleStar} />
                  </div>
                </div>
              </li>
            );
          })}
          </Link>
        </ul>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} ListAdded={ListAdded} />
    </div>
  );
};

export default ToDoListMain;