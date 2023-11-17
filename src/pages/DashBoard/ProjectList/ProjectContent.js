import { Button, Divider, Grid, Icon, IconButton, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from './project.module.css';
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Piechart from './Piechart.js'
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Box, width } from "@mui/system";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';
import Org_Chart from "../../Org_Chart/components/Org_Chart_Modal/Org_Chart.js";
import { LoginContext } from "../../../App";
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';

const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
        console.log(e);
        console.log(e.$d);
        console.log(e.name);
        //const {name,value} = e.target;
        
        //setSchedule(prev=>({...prev,[name]:value}));
    }

    const handleAdd = () => {
        axios.post(`/api/project/addSchedule/${seq}`,schedule).then(res=>{
            setTodo(prev=>([...prev,schedule]));
        });
    }
    return(
        <div style={{width:"500px"}} className={`${style.border}`}>
            <div className={`${style.padding20} ${style.center}`}>
                시작일 : 
                <input type="date" name="pschedule_start" onChange={handleChange}/>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.padding20} ${style.center}`}>
                종료일 : 
                <input type="date" name="pschedule_end" onChange={handleChange}/>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.padding20} ${style.center}`}>
                할일 : 
                <input type="text" name="pschedule_contents" onChange={handleChange}/>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.padding20} ${style.center}`}>
                중요도
                <select name="pschedule_importance" id="importance" onChange={handleChange}>
                    <option value="High" name="importance">High</option>
                    <option value="Middle" name="importance">Middle</option>
                    <option value="Low" name="importance">Low</option>
                </select>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.padding20} ${style.center}`}>
                상태 - 
                <select name="pschedule_state" id="state" onChange={handleChange}>
                    <option value="0" name="state">해야할 일</option>
                    <option value="1" name="state">진행중</option>
                    <option value="2" name="state">완료</option>
                </select>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.btnEven} ${style.padding10}`}>
                <IconButton aria-label="remove" onClick={handleClose} sx={{color:"black"}}>
                    <RemoveIcon />
                    <Typography sx={{fontSize:"14"}}>
                        취소
                    </Typography>
                </IconButton>
                <IconButton aria-label="add" onClick={handleAdd} sx={{color:"black"}}>
                    <AddIcon/>
                    <Typography sx={{fontSize:"14"}}>
                        추가하기
                    </Typography>                    
                </IconButton>
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

const UpdateState = ({handleClose,pseq,setUpdate}) => {
    const navi = useNavigate();
    const [state,setState] = useState({pschedule_seq:pseq,pschedule_state:0});
    const {todo,setTodo} = useContext(AddScheduleContext);
    const handleChange = (e) => {
        const {name,value} = e.target;
        setState({pschedule_seq:pseq,[name]:value});
    }

    const handleUpdate = () => {
        console.log(state);
        axios.put(`/api/project/update/state`,state).then(res=>{
            setUpdate(true);
            handleClose();
        });
    }

    const handleDelete = () => {
        console.log(todo);
        const tempTodo = todo.filter(e=>e.pschedule_seq != pseq); 
        // axios.delete(`/api/project/todo/delete/${pseq}`).then(res=>{
            
        // });
    }
    return(
        <div>
            <div className={`${style.border} ${style.padding20}`}>
                상태 - 
                <select name="pschedule_state" id="state" onChange={handleChange}>
                    <option value="0" name="state">해야할 일</option>
                    <option value="1" name="state">진행중</option>
                    <option value="2" name="state">완료</option>
                </select>
            </div>
            <div className={`${style.border} ${style.padding20} ${style.center}`}>
                지우기
                <IconButton aria-label="clear" onClick={handleDelete}>
                    <ClearIcon sx={{color:"red"}}/>               
                </IconButton>
            </div>
            
            <div className={`${style.border} ${style.padding20} ${style.btnEven}`}>
                <button onClick={handleClose}>취소</button>
                <button onClick={handleUpdate}>수정</button>
            </div>
        </div>
    )
}

const ProjectTodo = () => {
    const {seq} = useParams();
    const {todo,setTodo} = useContext(AddScheduleContext);
    const [open, setOpen] = useState(false);
    const [pseq,setSeq] = useState(0);
    const [isUpdate,setUpdate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    useEffect(()=>{
        axios.get(`/api/project/todo/${seq}`).then(res=>{
            setTodo(res.data);
            setUpdate(false);
        }).catch(()=>{
            console.log("0");
        });
    },[isUpdate]);

    const handleDelete = (e) =>{
        console.log(e.target);
    }
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
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        시작일
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                            종료일
                        </Typography>
                    </Grid>
                    <Grid xs={4} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        할일
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        중요도
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
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
                                <ListItem button onClick={()=>{
                                    handleOpenUpdate();
                                    setSeq(e.pschedule_seq);
                                }}>
                                    <Grid container key={i} className={`${style.marginT10}`}> 
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_start ? format(new Date(e.pschedule_start), 'yyyy-MM-dd') : e.pschedule_start}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.pschedule_end ? format(new Date(e.pschedule_end), 'yyyy-MM-dd') : e.pschedule_end}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_contents}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_importance}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center} button>
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
                    <Modal
                        open={openUpdate}
                        onClose={handleCloseUpdate}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={Modalstyle} className={`${style.bgwhite}`}>
                            <UpdateState handleClose={handleCloseUpdate} pseq={pseq} setUpdate={setUpdate}/>
                        </Box>
                    </Modal>
        </div>
    )
}

const AddMember = ({handleClose}) => {
    const [childopen, setChildOpen] = useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);
    
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const navi = useNavigate();
    const {seq} = useParams();
    const {member, setMember} = useContext(MemberContext);
    const [newMember,setNewMember] = useState({pseq:0,group_name:"없음",name:"",id:""});
    const [approver, setApprover] = useState({}); //승인자의 정보을 저장하는 useState 

    const handleChange = (e) => {
        const {name,value} = e.target;
        setNewMember(prev=>({...prev,[name]:value}));
    }
    useEffect(()=>{
        if(approver.group_name == null){
            setNewMember(prev=>({...prev,["group_name"]:"없음",["id"]:approver.id,["name"]:approver.name}));
        }else{
            setNewMember(prev=>({...prev,["group_name"]:approver.group_name,["id"]:approver.id,["name"]:approver.name}));
        }
        
    },[approver]);

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

            <Grid container spacing={2}> 
                <Grid xs={3} className={style.center}>
                    <IconButton aria-label="add" onClick={toggleModal}>
                        조직도에서 추가
                        <AddIcon fontSize='large'/>
                    </IconButton>                    
                </Grid>
                <Grid xs={9} className={style.center}>
                    <Grid container> 
                        <Grid xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                ID
                                <input type="text" name="name" value={approver.id ? approver.id : ""} onChange={handleChange}/>
                            </div>
                        </Grid>
                        <Grid xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                부서
                                <input type="text" name="group_name" value={approver.group_name == null ? "없음" : approver.group_name} onChange={handleChange}/>
                            </div>
                        </Grid>
                        <Grid xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                이름
                                <input type="text"value={approver.name ? approver.name : ""}/>
                            </div>
                        </Grid>
                        <Grid xs={12} className={`${style.center}`}>
                            <div className={`${style.border} ${style.btnEven}`}>
                                <button onClick={handleClose}>취소</button>
                                <button onClick={handleAdd}>추가</button>
                            </div>
                        </Grid>
                    </Grid>
                    
                    
                    
                    
                </Grid>
            </Grid>
            
            
            <div className={`${style.modalWidth}`}>
                <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover} />
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
            <div>
                <Grid container className={`${style.marginTB20}`}> 
                    <Grid xs={4} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                            사원번호
                        </Typography>
                    </Grid>
                    <Grid xs={4} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                            이름
                        </Typography>
                    </Grid>
                    <Grid xs={4} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        부서
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{bgcolor:"black"}}/>
                {member.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <Grid container key={i} className={`${style.marginT10}`}> 
                                        <Grid xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.id}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.name}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.group_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                                
                            <Divider />
                                
                            </List>
                        )
                    })}
            </div>
            
        </div>
    )
}

export const progressContext = createContext();
const AddScheduleContext = createContext();
const MemberContext = createContext();

const ProjectContent = () => {
    const {seq} = useParams();
    const {loginID} = useContext(LoginContext);
    const [todo,setTodo] = useState([{}]);
    const [member,setMember] = useState([{}]);
    const [progress,setProgress] = useState([{}]);
    const [manager,setManager] = useState("");
    const navi = useNavigate();

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

        axios.get(`/api/project/getManager/${seq}`).then(res=>{
            setManager(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);

    const deleteContents = () =>{
        axios.delete(`/api/project/delete/${seq}`).then(res=>{
            navi("/groovy/dashboard/project");
        }).catch((e)=>{
            console.log(e);
        });
    }
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

            <Grid item xs={12}>
                <div className={`${style.border} ${style.borderRad10} ${style.btnEven} ${style.padding10}`}>
                    <Link to="/groovy/dashboard/project"><Button variant="outlined">
                        목록으로
                    </Button></Link>
                    {
                        loginID == manager ? <Button variant="outlined" color="error" onClick={deleteContents}>삭제하기</Button> : ""
                    }            
                </div>
            </Grid>
        </Grid>
        </div>
    )
}

export default ProjectContent;