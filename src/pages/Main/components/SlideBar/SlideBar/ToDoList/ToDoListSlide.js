import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./ToDoListSlide.module.css";
import Modal from "../../../../../ToDoList/ToDoListModal/ToDoListModal"
import { Link, useNavigate } from "react-router-dom";
import calendar from "./assets/calendar.png";
import grid from "./assets/grid.png";
import { MemberContext } from "../../../../../Groovy/Groovy";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import StarIcon from "../../../../../ToDoList/ToDoListMain/StarIcon";
import { ToDoListContext } from "../../../../../Groovy/Groovy";
import axios from "axios";

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
    const { todoList, setTodoList, toggleStar, ListAdded, tdlbg } = useContext(ToDoListContext);
    const [showModal, setShowModal] = useState(false);
    const [submenus, setSubmenus] = useState({}); // 서브메뉴 목록
    const navigate = useNavigate();
    const handleListClick = (event, todo) => {
        if (!event.target.closest('.starimg') && !event.target.closest('.bgbox')) {
            navigate(`ToDoListBoard`, { state: { seq: todo.seq } });
        }
    };
    const submenuRefs = useRef({});
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutside = Object.keys(submenuRefs.current).every(key => {
                return submenuRefs.current[key] && !submenuRefs.current[key].contains(event.target);
            });

            if (isOutside) {
                setSubmenus(prev => Object.keys(prev).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {}));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const backgroundstyles = [
        { bg: "linear-gradient(to right, #FFF2F2, #E5E0FF ,#8EA7E9, #7286D3 )" },
        { bg: "linear-gradient(to right, #F4EEFF, #DCD6F7 ,#A6B1E1, #424874 )" },
        { bg: "linear-gradient(to right, #F9F7F7, #DBE2EF ,#3F72AF, #112D4E )" },
        { bg: "linear-gradient(to right, #F9F8EB, #A7D7C5 ,#74B49B, #5C8D89 )" },
        { bg: "linear-gradient(to right, #FFFBE9, #E3CAA5 ,#CEAB93, #AD8B73 )" },
        { bg: "linear-gradient(to right, #F1F1F6, #E1CCEC ,#C9B6E4, #BE9FE1 )" },
        { bg: "linear-gradient(to right, #FAF4B7, #F6C6EA ,#F9F9F9, #CDF0EA )" },
        { bg: "linear-gradient(to right, #A7FFE4, #FFD6EC ,#FFA1CF, #FF74B1 )" },
        { bg: "linear-gradient(to right, #FEF9A7, #FAC213 ,#F77E21, #D61C4E )" },
        { bg: "linear-gradient(to right, #F3D1F4, #F5FCC1 ,#BAE5E5, #98D6EA )" },
        { bg: "linear-gradient(to right, #F3C1C6, #F0F69F ,#B0E0A8, #D8EFF0 )" },
        { bg: "linear-gradient(to right, #FF6B6B, #FFD93D ,#6BCB77, #4D96FF )" },
    ]

    const toggleModal = () => {
        setShowModal(!showModal);
        ListAdded();
    }

    const handleBgBoxClick = (seq) => {
        setSubmenus(prev => ({
            ...prev,
            [seq]: !prev[seq]
        }));
    };

    const updateBackground = async (parent_seq, bgselect, e) => {
        e.stopPropagation(); // Prevent event bubbling
        const sendtoupdate = { parent_seq: parent_seq, bgselect: bgselect };
        try {
            await axios.put(`/api/tdlbackground/${parent_seq}`, sendtoupdate);
            setSubmenus(prev => ({
                ...prev,
                [parent_seq]: false
            }));
            ListAdded();
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }


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
            {/* <Link to="ToDoListCalendar">
                <div className={styles.select}>
                    <img src={calendar} alt="where..?" width={"20px"} height={"20px"} /> <span className={styles.selectMenu}>Calendar</span>
                </div>
            </Link> */}
            <div className={styles.selectTitle}>
                Team Boards <span className={styles.selectDown}><button className={styles.btn}>+</button></span>
            </div>
            <Link to="ToDoListTeam">
                <div className={styles.select}>
                    <div className={styles.colorbox}></div> <span className={styles.selectMenu}>Team Board</span>
                </div>
            </Link>
            <div className={styles.selectTitle}>
                Your Boards <span className={styles.selectDown}><button className={styles.btn} onClick={toggleModal}>+</button></span>
            </div>
            <ul className={styles.tdlul}>
                {todoList.map((todo, index) => {
                    return (
                        <li className={styles.tdlli} key={index} onClick={e => handleListClick(e, todo)}>
                            <div className={styles.tdlDBInsert}>
                                {tdlbg.map((bg, index) => {
                                    return ( todo.seq === bg.parent_seq) && 
                                        <div className={styles.bgbox} key={index} title="배경을 바꾸고 싶으면 눌러봐!"
                                        onClick={() => handleBgBoxClick(todo.seq)} style={{ backgroundImage: bg.bgselect }}></div>
                                    })}
                                    {submenus[todo.seq] && (
                                        <ul className={styles.submenu} ref={el => submenuRefs.current[todo.seq] = el} >
                                            <div>배경을 선택해주세요</div>
                                            {backgroundstyles.map((style, index) => (
                                                <li key={index} onClick={(e) => updateBackground(todo.seq, style.bg, e)}>
                                                    <div className={styles.bgselect} style={{ backgroundImage: style.bg }}></div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                <div className={styles.tdltitle}>{todo.title}</div>
                                <div className={`${styles.starimg} ${todo.isActive ? styles.starActive : ''}`}>
                                    <StarIcon id={index} isActive={todo.isActive} onClick={toggleStar} />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Modal showModal={showModal} setShowModal={setShowModal} ListAdded={ListAdded} />
        </div>
    );
};

export default ToDoListSlide;