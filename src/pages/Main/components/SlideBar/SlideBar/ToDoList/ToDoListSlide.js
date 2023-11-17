import React, { useContext } from "react";
import styles from "./ToDoListSlide.module.css";
import { Link, useNavigate } from "react-router-dom";
import calendar from "./assets/calendar.png";
import grid from "./assets/grid.png";
import { MemberContext } from "../../../../../Groovy/Groovy";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import StarIcon from "../../../../../ToDoList/ToDoListMain/StarIcon";
import { ToDoListContext } from "../../../../../Groovy/Groovy";

const StyledAvatar = styled(Avatar)({
    width: "100%",
    height: "100%",
    borderRadius: "0%",

});
const ProfileContainer = styled("div")({
    width: "30px",
    height: "30px",
});

const ToDoListSlide = () => {
    const members = useContext(MemberContext);
    const { todoList, setTodoList, toggleStar, ListAdded } = useContext(ToDoListContext);
    const navigate = useNavigate();
    const handleListClick = (event, todo) => {
        if (!event.target.closest('.starimg')) {
            navigate(`ToDoListBoard`, { state: { seq: todo.seq } });
        }
    };
    

    return (
        <div>
            <div className={styles.workspace}>
                {members.member.profile_image ? <ProfileContainer>
                            <StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" />
                        </ProfileContainer> : <ProfileContainer>
                            <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile"/>
                        </ProfileContainer>} <div className={styles.workspacetitle}>{members.member.name}<span>'s Workspace</span></div>
            </div>
            <div className={styles.selectTitle}>
                Workspace Views
            </div>
            <Link to="">
                <div className={styles.select}>
                    <img src={grid} alt="where..?" width={"20px"} height={"20px"} /> <span className={styles.selectMenu}>Boards</span>
                </div>
            </Link>
            <Link to="ToDoListCalendar">
                <div className={styles.select}>
                    <img src={calendar} alt="where..?" width={"20px"} height={"20px"} /> <span className={styles.selectMenu}>Calendar</span>
                </div>
            </Link>
            <div className={styles.selectTitle}>
                Team Boards <span className={styles.selectDown}><button className={styles.btn}>+</button></span>
            </div>
            <Link to="ToDoListTeam">
                <div className={styles.select}>
                    <div className={styles.colorbox}></div> <span className={styles.selectMenu}>Team Board</span>
                </div>
            </Link>
            <div className={styles.selectTitle}>
                Your Boards <span className={styles.selectDown}><button className={styles.btn}>+</button></span>
            </div>
            <ul className={styles.tdlul}>
                {todoList.map((todo, index) => {
                    return (
                        <li className={styles.tdlli} key={index} onClick={e => handleListClick(e, todo)}>
                            <div className={styles.tdlDBInsert} style={{ backgroundImage: `url(${todo.bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className={styles.tdltitle}>{todo.title}</div>
                                <div className={`${styles.starimg} ${todo.isActive ? styles.starActive : ''}`}>
                                    <StarIcon id={index} isActive={todo.isActive} onClick={toggleStar} />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    );
};

export default ToDoListSlide;