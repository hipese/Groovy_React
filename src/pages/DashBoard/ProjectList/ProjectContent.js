import { Button, CircularProgress, Divider, Grid, Icon, IconButton, List, ListItem, Typography } from "@mui/material";
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
import { useWebSocket } from "../../../WebSocketContext/WebSocketContext";

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
    const [schedule,setSchedule] = useState({pschedule_seq:0,pschedule_start: '', pschedule_end: "", pschedule_contents: "", pschedule_importance: 'Low',pschedule_state:0});
    const handleChange = (e) => {
        const {name,value} = e.target;
        setSchedule(prev=>({...prev,[name]:value}));
    }

    const handleAdd = () => {
        if(schedule.pschedule_contents == "" || schedule.pschedule_contents == undefined){
            alert("할일을 적어주세요.");
            return;
        }else if(schedule.pschedule_start>schedule.pschedule_end){
            alert("종료일이 시작일보다 이전일 수 없습니다.")
            return;
        }

        axios.post(`/api/project/addSchedule/${seq}`,schedule).then(res=>{
            const temp = {...schedule,pschedule_seq:res.data};
            setTodo(prev=>([...prev,temp]));
            handleClose();
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
                <IconButton onClick={handleClose} sx={{color:"black"}}>
                    <RemoveIcon />
                    <Typography sx={{fontSize:"14"}}>
                        취소
                    </Typography>
                </IconButton>
                <IconButton onClick={handleAdd} sx={{color:"black"}}>
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
        axios.put(`/api/project/update/state`,state).then(res=>{
            setUpdate(true);
            handleClose();
        });
    }

    const handleDelete = () => {
        axios.delete(`/api/project/todo/delete/${pseq}`).then(res=>{
                const tempTodo = todo.filter(e=>e.pschedule_seq !== pseq); 
                setTodo(tempTodo)
                handleClose();
            }).catch((e)=>{
                console.log(e);;    
        });
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
                <IconButton onClick={handleDelete}>
                    <ClearIcon sx={{color:"red"}}/>               
                </IconButton>
            </div>
            
            <div className={`${style.border} ${style.padding20} ${style.btnEven}`}>
                
                <Button variant="outlined" size="small" color="error" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="outlined" size="small" color="primary" onClick={handleUpdate}>
                    수정
                </Button>                
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

    // const handleDelete = (e) =>{
    //     console.log(e.target);
    // }
    return(
        <div className={`${style.todosection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                일정
                <IconButton aria-label="add" onClick={handleOpen}>
                    <AddIcon fontSize='small'/>
                </IconButton>
            </div>
            <Modal
                open={Boolean(open)}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Modalstyle} className={`${style.bgwhite}`}>
                    <AddSchedule handleClose={handleClose}/>
                </Box>
            </Modal>
            <div className={`${style.borderbtm}`}>
                <Grid container className={`${style.marginTB20}`}> 
                    <Grid item xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        시작일
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                            종료일
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        할일
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        중요도
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={style.center}>
                        <Typography className={`${style.fs} ${style.b}`}>
                        상태
                        </Typography>
                    </Grid>
                </Grid>   
            </div>
                    {todo.map((e,i)=>{
                        return(
                            <List sx={style} className={`${style.borderbtm}`} key={i} component="nav" aria-label="mailbox folders">
                                <ListItem button onClick={()=>{
                                    handleOpenUpdate();
                                    setSeq(e.pschedule_seq);
                                    console.log(todo);
                                }}>
                                    <Grid container className={`${style.marginT10}`}> 
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_start ? format(new Date(e.pschedule_start), 'yyyy-MM-dd') : e.pschedule_start}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_end ? format(new Date(e.pschedule_end), 'yyyy-MM-dd') : e.pschedule_end}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_contents}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_importance}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pschedule_state != '2' ? e.pschedule_state != '1' ? "해야할 일" : "진행중" : "완료"}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                            </List>
                        )
                    })}
                    <Modal
                        open={Boolean(openUpdate)}
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
    const isSign=false;
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const navi = useNavigate();
    const {seq} = useParams();
    const {member, setMember} = useContext(MemberContext);
    const [newMember,setNewMember] = useState({pseq:0,group_name:"없음",name:"",id:""});
    const [approver, setApprover] = useState({}); //승인자의 정보을 저장하는 useState 
    const [selectMemberdetail, setSelectMemberdetail] = useState({});

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

    const stompClient = useWebSocket();
    


    const handleAdd = () => {
        let temp = "";
        temp = member.filter(e=>e.id == newMember.id);

        if(newMember.id == "" || newMember.group_name == "" || newMember.name == "" || newMember.id == undefined || newMember.group_name == undefined || newMember.name == undefined){
            alert("멤버를 선택해주세요.");
            return;
        }else if(temp.length>0){
            alert("이미 초대된 사원입니다.");
            return;
        }

        axios.post(`/api/project/addMember/${seq}`,newMember).then(res=>{
            const parentSeq = res.data; // 서버에서 반환한 값으로 설정
            const message = "프로젝트에 초대되었습니다.";
            const messageObject = { message, recipient: newMember.id, parent_seq: parentSeq };

            // Stomp를 통해 메시지 전송
            if (stompClient) {
                stompClient.send("/app/notice", {}, JSON.stringify(messageObject));
            }

            setMember(prev=>([...prev,newMember]));
            handleClose();
        });
    }
    return(
        <div>

            <Grid container spacing={2}> 
                <Grid item xs={3} className={style.center}>
                    <IconButton onClick={toggleModal}>
                        조직도에서 추가
                        <AddIcon fontSize='large'/>
                    </IconButton>                    
                </Grid>
                <Grid item xs={9} className={style.center}>
                    <Grid container> 
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                ID
                            </div>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                부서
                            </div>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                이름
                            </div>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                <input type="text" name="name" value={approver.id ? approver.id : ""} onChange={handleChange} readOnly/>
                            </div>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                <input type="text" name="group_name" value={approver.group_name == null ? "없음" : approver.group_name} onChange={handleChange} readOnly/>
                            </div>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <div className={`${style.padding10}`}>
                                <input type="text"value={approver.name ? approver.name : ""} readOnly/>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={`${style.center}`}>
                            <div className={`${style.btnEven} ${style.w100}`}>
                                <Button variant="outlined" size="small" color="error" onClick={handleClose}>
                                    취소
                                </Button>
                                <Button variant="outlined" size="small" color="primary" onClick={handleAdd}>
                                    추가
                                </Button> 
                            </div>
                        </Grid>
                    </Grid> 
                </Grid>
            </Grid>
            <div className={`${style.modalWidth}`}>
                <Org_Chart isOpen={isModalOpen} close={toggleModal} approver={approver} setApprover={setApprover} 
                selectMemberdetail={selectMemberdetail} setSelectMemberdetail={setSelectMemberdetail} isSign={isSign} />
            </div>
            
            
        </div>
        
    )
}

const ProjectMember = () => {
    const {member,setMember,loginID, manager} = useContext(MemberContext);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteMember = (pseq,id) => {
        let bool = window.confirm("멤버를 추방하시겠습니까?");
        if(bool){
            axios.delete(`/api/project/delete/member/${pseq}/${id}`).then(res=>{
                const tempMember = member.filter(e=>e.id !== id);
                setMember(tempMember);
            });    
        }else{
            return;
        }        
    }
    
    return loginID == manager ?(
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
                <div className={`${style.borderbtm}`}>
                    <Grid container className={`${style.marginTB20}`}> 
                        <Grid item xs={3} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                                사원번호
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                                이름
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                            부서
                            </Typography>
                        </Grid>
                        <Grid item xs={1} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                            삭제
                            </Typography>
                        </Grid>
                    </Grid>
                </div>                
                {member.map((e,i)=>{
                        return(
                            <List sx={style} className={`${style.borderbtm}`} key={i} component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <Grid container className={`${style.marginT10}`}> 
                                        <Grid item xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.id}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.group_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} className={style.center}>
                                            {
                                                e.id == manager ? "" : <IconButton onClick={()=>{handleDeleteMember(e.pseq,e.id)}}>
                                                                            <ClearIcon sx={{color:"red"}}/>               
                                                                        </IconButton>
                                            }
                                            
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                            </List>
                        )
                    })}
            </div>
            
        </div>
    )
    :
    (
        <div className={`${style.membersection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
            프로젝트 멤버
            </div>
            
            <Modal
                open={Boolean(open)}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Modalstyle} className={`${style.bgwhite}`}>
                    <AddMember handleClose={handleClose}/>
                </Box>
            </Modal>
            <div>
                <div className={`${style.borderbtm}`}>
                    <Grid container className={`${style.marginTB20}`}> 
                        <Grid item xs={4} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                                사원번호
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                                이름
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={style.center}>
                            <Typography className={`${style.fs} ${style.b}`}>
                            부서
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    {member.map((e,i)=>{
                            return(
                                <List sx={style} key={i} className={`${style.borderbtm}`} component="nav" aria-label="mailbox folders">
                                    <ListItem>
                                        <Grid container className={`${style.marginT10}`}> 
                                            <Grid item xs={4} className={style.center}>
                                                <Typography className={`${style.fs} ${style.b}`}>
                                                {e.id}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} className={style.center}>
                                                <Typography className={`${style.fs} ${style.b}`}>
                                                    {e.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} className={style.center}>
                                                <Typography className={`${style.fs} ${style.b}`}>
                                                {e.group_name}
                                                </Typography>
                                            </Grid>
                                        </Grid>            
                                    </ListItem>                                    
                                </List>
                            )
                        })}
                </div>
                
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
    const [isLoading,setLoading] = useState(true);
    const navi = useNavigate();

    const CircularIndeterminate = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    };

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
            setLoading(false);
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

    if(isLoading){
        return(<CircularIndeterminate/>)
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
                <MemberContext.Provider value={{member,setMember,loginID,manager}}>
                    <ProjectMember/>
                </MemberContext.Provider>
            </Grid>

            <Grid item xs={12}>
                <div className={`${style.border} ${style.borderRad10} ${style.btnEven} ${style.padding10} ${style.marginB20}`}>
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