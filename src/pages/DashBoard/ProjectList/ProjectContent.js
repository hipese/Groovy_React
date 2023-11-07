import { Grid, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import style from './project.module.css';
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Piechart from './Piechart.js'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";

const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const AddSchedule = ({handleClose}) => {
    const navi = useNavigate();
    const {seq} = useParams();
    const {todo,setTodo} = useContext(AddScheduleContext);
    const [schedule,setSchedule] = useState({pschedule_start: '', pschedule_end: "", pschedule_contents: "", pschedule_importance: 'High',pschedule_state:0});
    const handleChange = (e) => {
        const {name,value} = e.target;
        
        setSchedule(prev=>({...prev,[name]:value}));
    }

    const handleAdd = () => {
        axios.post(`/api/project/addSchedule/${seq}`,schedule).then(res=>{
            setTodo(prev=>([...prev,schedule]));
        });
    }
    return(
        <div>
            <div className={`${style.border}`}>
                시작일 : 
                <input type="date" name="pschedule_start" onChange={handleChange}/>
            </div>
            <div className={`${style.border}`}>
                종료일 : 
                <input type="date" name="pschedule_end" onChange={handleChange}/>
            </div>
            <div className={`${style.border}`}>
                할일 : 
                <input type="text" name="pschedule_contents" onChange={handleChange}/>
            </div>
            <div className={`${style.border}`}>
                중요도
                <select name="pschedule_importance" id="importance" onChange={handleChange}>
                    <option value="High" name="importance">High</option>
                    <option value="Middle" name="importance">Middle</option>
                    <option value="Low" name="importance">Low</option>
                </select>
            </div>
            <div className={`${style.border}`}>
                상태 - 
                <select name="pschedule_state" id="state" onChange={handleChange}>
                    <option value="0" name="state">해야할 일</option>
                    <option value="1" name="state">진행중</option>
                    <option value="2" name="state">완료</option>
                </select>
            </div>
            <div className={`${style.border} ${style.btnEven}`}>
                <button onClick={handleClose}>취소</button>
                <button onClick={handleAdd}>추가</button>
            </div>
        </div>
    )
}

const ProjectProgress = () => {
    return (
        <div className={`${style.progsection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                진행상황
            </div>
            <div className={`${style.bgwhite}`}>
                <Piechart/>
            </div>
        </div>
    )
}

const ProjectTodo = () => {
    const {todo,setTodo} = useContext(AddScheduleContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div className={`${style.todosection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                일정
                <IconButton aria-label="add" onClick={handleOpen}>
                    <AddIcon fontSize='small'/>
                </IconButton>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Modalstyle} className={`${style.bgwhite}`}>
                    <AddSchedule handleClose={handleClose}/>
                </Box>
            </Modal>
            <table border="1" className={`${style.list}`}>
                <thead>
                    <tr>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>할일</th>
                        <th>중요도</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.pschedule_start}</td>
                                <td>{e.pschedule_end}</td>
                                <td>{e.pschedule_contents}</td>
                                <td>{e.pschedule_importance}</td>
                                <td>{e.pschedule_state}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const ProjectMember = ({member,setMember}) => {
    return(
        <div className={`${style.membersection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                프로젝트 멤버
            </div>
            <table border="1" className={`${style.list}`}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>부서</th>
                    </tr>
                </thead>
                <tbody>
                    {member.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>{e.group_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export const progressContext = createContext();
const AddScheduleContext = createContext();

const ProjectContent = () => {
    const {seq} = useParams();
    const [todo,setTodo] = useState([{}]);
    const [member,setMember] = useState([{}]);
    const [progress,setProgress] = useState([{}]);

    useEffect(()=>{
        axios.get(`/api/project/todo/${seq}`).then(res=>{
            setTodo(res.data);
        }).catch(()=>{
            console.log("0");
        });

        axios.get(`/api/project/member/${seq}`).then(res=>{
            setMember(res.data);
        });

        axios.get(`/api/project/progress/${seq}`).then(res=>{
            setProgress(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);
    return(
        <div className={`${style.padding40} ${style.contentDiv}`}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <progressContext.Provider value={{progress,setProgress,todo,setTodo,seq}}>
                    <ProjectProgress/>
                </progressContext.Provider>
            </Grid>

            <Grid item xs={12}>
                <AddScheduleContext.Provider value={{todo,setTodo}}>
                    <ProjectTodo/>
                </AddScheduleContext.Provider>
            </Grid>

            <Grid item xs={12}>
                <ProjectMember member={member} setMember={setMember}/>
            </Grid>
        </Grid>
        </div>
    )
}

export default ProjectContent;