import { Divider, Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import style from './project.module.css';
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Piechart from './Piechart.js'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';

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
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="시작일" name="pschedule_start" onChange={handleChange}/>
                    </DemoContainer>
                </LocalizationProvider> */}
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

const UpdateState = ({handleClose}) => {
    const navi = useNavigate();
    const {seq} = useParams();
    const {member, setMember} = useContext(MemberContext);
    const [newMember,setNewMember] = useState({pmember_seq:0,pseq:0,group_name:"",name:""});
    const handleChange = (e) => {
        const {name,value} = e.target;
        
        setNewMember(prev=>({...prev,[name]:value}));
    }

    const handleAdd = () => {
        setMember(prev=>([...prev,newMember]));
        console.log(newMember);
        axios.post(`/api/project/addMember/${seq}`,newMember).then(res=>{
            setMember(prev=>([...prev,member]));
            handleClose();
        });
    }
    return(
        <div>
            <div className={`${style.border}`}>
                이름
                <input type="text" name="name" onChange={handleChange}/>
            </div>
            <div className={`${style.border}`}>
                부서
                <input type="text" name="group_name" onChange={handleChange}/>
            </div>
            <div className={`${style.border} ${style.btnEven}`}>
                <button onClick={handleClose}>취소</button>
                <button onClick={handleAdd}>추가</button>
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
            <div>
                <Grid container className={`${style.marginT10}`}> 
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        시작일
                        </Typography>
                    </Grid>
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                            종료일
                        </Typography>
                    </Grid>
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        할일
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        중요도
                        </Typography>
                    </Grid>
                    <Grid xs={1} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        상태
                        </Typography>
                    </Grid>
                </Grid>     
                <Divider/>
            </div>
                    {todo.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <ListItem button>
                                    <Grid container key={i} className={`${style.marginT10}`}> 
                                        <Grid xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_start ? format(new Date(e.pschedule_start), 'yyyy-MM-dd') : e.pschedule_start}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.pschedule_end ? format(new Date(e.pschedule_end), 'yyyy-MM-dd') : e.pschedule_end}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_contents}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_importance}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={1} className={style.center} button>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_state != '2' ? e.pschedule_state != '1' ? "해야할 일" : "진행중" : "완료"}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                            <Divider />
                                
                            </List>
                        )
                    })}
        </div>
    )
}

const AddMember = ({handleClose}) => {
    const navi = useNavigate();
    const {seq} = useParams();
    const {member, setMember} = useContext(MemberContext);
    const [newMember,setNewMember] = useState({pmember_seq:0,pseq:0,group_name:"",name:""});
    const handleChange = (e) => {
        const {name,value} = e.target;
        
        setNewMember(prev=>({...prev,[name]:value}));
    }

    const handleAdd = () => {
        setMember(prev=>([...prev,newMember]));
        console.log(newMember);
        axios.post(`/api/project/addMember/${seq}`,newMember).then(res=>{
            setMember(prev=>([...prev,member]));
            handleClose();
        });
    }
    return(
        <div>
            <div className={`${style.border}`}>
                이름
                <input type="text" name="name" onChange={handleChange}/>
            </div>
            <div className={`${style.border}`}>
                부서
                <input type="text" name="group_name" onChange={handleChange}/>
            </div>
            <div className={`${style.border} ${style.btnEven}`}>
                <button onClick={handleClose}>취소</button>
                <button onClick={handleAdd}>추가</button>
            </div>
        </div>
    )
}

const ProjectMember = () => {
    const {member,setMember} = useContext(MemberContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <div className={`${style.membersection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
            프로젝트 멤버
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
                    <AddMember handleClose={handleClose}/>
                </Box>
            </Modal>
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
const MemberContext = createContext();

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
                <MemberContext.Provider value={{member,setMember}}>
                    <ProjectMember/>
                </MemberContext.Provider>
            </Grid>
        </Grid>
        </div>
    )
}

export default ProjectContent;