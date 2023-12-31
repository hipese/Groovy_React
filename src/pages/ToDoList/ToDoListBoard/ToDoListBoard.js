import styles from "./ToDoListBoard.module.css";
import { useContext, useState, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "../ToDoListMain/StarIcon";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { ToDoListContext } from "../../Groovy/Groovy";
import { MemberContext } from "../../Groovy/Groovy";
import Contents from "./ToDoListContents"
import axios from "axios";


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
  const { todoList, setTodoList, toggleStar, tdlbg } = useContext(ToDoListContext);
  const location = useLocation();
  const { seq } = location.state;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const navigate = useNavigate();
  const handleDeletePage = (seq) => {
    const result = window.confirm("정말 삭제하시겠습니까?");

    if (result) {
      axios.delete(`/api/tdList/${seq}`, { params: { seq: seq } });
      setTodoList(prev => prev.filter(todo => todo.seq !== seq));
      navigate("/Groovy/list");
    }
  };
  const startEdit = (todo) => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleEditChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const saveEdit = (todo, index) => {
    if (editedTitle !== todo.title) {
      axios.put(`/api/tdList/${todo.seq}`, { seq: todo.seq, title: editedTitle }).then(res => {
        console.log("res: ", res);
        setTodoList(prev => {
          const updatedList = [...prev];
          updatedList[index].title = editedTitle;
          return updatedList;
        }); 
      });


    }
    setIsEditing(false);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTitle("");
  }
  const editBorderRef = useRef(null);
  useEffect(() => {
  const handleGlobalClick = (event) => {
    if (isEditing && editBorderRef.current && !editBorderRef.current.contains(event.target)) {
        setIsEditing(false);
        setEditedTitle("");
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isEditing, editBorderRef]);

  return (
    <>
    {tdlbg.map((bg, index) => {
      return ( seq === bg.parent_seq) &&
        <div className={styles.tdlboard} style={{ backgroundImage: bg.bgselect }} key={index}>
            {todoList.map((todo, index) => { 
              if (todo.seq === seq) {
                return (
                  <div className={styles.tdlboardheader} key={index}>
                    {!isEditing ? (
                      <div onClick={() => startEdit(todo)} className={styles.tdlboardtitle}>{todo.title}</div>
                    ) : (
                      <div className={styles.editborder} ref={editBorderRef}>
                        <input type="text" className={styles.titleedit} value={editedTitle} onChange={event => { handleEditChange(event); }} onKeyDown={e => e.key === "Enter" && saveEdit(todo, index)} />
                        <button className={styles.titleeditbtn} onClick={cancelEdit}>x</button>
                      </div>
                    )}
                    <div className={styles.tdlstarimg}><StarIcon key={index} isActive={todo.isActive} onClick={() => toggleStar(index)} /></div>
                    <div className={styles.tdlprofile}>
                      {members.member.profile_image ? <ProfileContainer><StyledAvatar src={`/profiles/${members.member.profile_image}`} alt="profile" /></ProfileContainer> : <ProfileContainer> <StyledAvatar src={`/assets/Default_pfp.svg`} alt="profile" /></ProfileContainer>}
                    </div>
                    <div className={styles.tdlsubmit}>
                      <button className={styles.tdlsubmitbutton} type="button" onClick={() => handleDeletePage(todo.seq)}>삭제</button>
                    </div>
                  </div>);
              } else {
                return null;
              }    
            })}
            <Contents parent_seq={seq} />
        </div>
      })}
    </>
  );
};

export default ToDoListBoard;