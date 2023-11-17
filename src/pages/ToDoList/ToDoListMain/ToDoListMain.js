import styles from "./ToDoListMain.module.css";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MemberContext } from "../../Groovy/Groovy";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Modal from "../ToDoListModal/ToDoListModal";
import StarIcon from "./StarIcon";
import { ToDoListContext } from "../../Groovy/Groovy";

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
  const [showModal, setShowModal] = useState(false); // 모달창 활성화 여부
  const { todoList, setTodoList, toggleStar ,ListAdded } = useContext(ToDoListContext);
  const toggleModal = () => {
    setShowModal(!showModal);
    ListAdded();
  }

  const navigate = useNavigate();
  const handleListClick = (event, todo) => {
    if (!event.target.closest('.starimg')) {
      navigate(`ToDoListBoard`, { state: { seq: todo.seq } });
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
          {todoList.map((todo, index) => {
            return (
              <li className={styles.tdlli} key={index} onClick={e => handleListClick(e, todo)}>
                <div className={styles.tdlDBInsert} style={{backgroundImage: `url(${todo.bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                  <div className={styles.tdltitle}>{todo.title}</div> 
                  <div className={`${styles.starimg} ${todo.isActive ? styles.starActive : ''}`}>
                    <StarIcon id={index} isActive={todo.isActive} onClick={toggleStar} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} ListAdded={ListAdded} />
    </div>
  );
};

export default ToDoListMain;