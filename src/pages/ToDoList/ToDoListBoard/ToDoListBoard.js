import styles from "./ToDoListBoard.module.css";
import { useContext, useState } from "react"
import { useLocation } from "react-router-dom";
import StarIcon from "../ToDoListMain/StarIcon";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { ToDoListContext } from "../../Groovy/Groovy";
import { MemberContext } from "../../Groovy/Groovy";
import Contents from "./ToDoListContents"


const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "1px solid #000000",

});
const ProfileContainer = styled("div")({
    maxWidth: "30px",
    maxHeight: "30px",
});

const ToDoListBoard = () => {
  const members = useContext(MemberContext);
  const { todoList, setTodoList, toggleStar, ListAdded } = useContext(ToDoListContext);
  const location = useLocation();
  const { seq } = location.state;



  return (
    <div className={styles.tdlboard}>
        {todoList.map((todo, index) => { 
          if (todo.seq === seq) {
            return (
              <div className={styles.tdlboardheader}>
                <div className={styles.tdlboardtitle} key={index}>{todo.title}</div>
                <div className={styles.tdlstarimg}><StarIcon key={index} isActive={todo.isActive} onClick={() => toggleStar(index)} /></div>
                <div className={styles.tdlprofile}>
                  {members.member.profile_image ? <ProfileContainer><StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" /></ProfileContainer> : <ProfileContainer> <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile"/></ProfileContainer>}
                </div>
                <div className={styles.tdlsubmit}>
                  <button className={styles.tdlsubmitbutton} type="button">작성</button>
                </div>
              </div>);
          }
        })}
        <Contents />
      



    </div>
  );
};

export default ToDoListBoard;