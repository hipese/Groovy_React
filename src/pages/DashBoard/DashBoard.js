import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import style from './DashBoard.module.css';
import { Button, ButtonGroup, CircularProgress, Divider, Grid, IconButton, List, ListItem, ListItemText, Modal, Pagination, PaginationItem, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Clock from 'react-live-clock';
import axios from 'axios';
import { LoginContext } from '../../App';
import { async } from 'q';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList/ProjectList';
import DeptNotice from './DeptNotice/DeptNotice';
import { format } from 'date-fns';
import { DateCalendar, DatePicker, LocalizationProvider, PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ControlCameraSharp } from '@mui/icons-material';

const Loading = () => {
return(
    <div>
    Loding......
    </div>
)
}

const Worksection = () => {
    const {isLoading,setLoading} = React.useContext(ProjectContext);
    const {loginID} = React.useContext(LoginContext);
    const [working,setWorking] = React.useState(false);
    const [workState,setWorkstate] = React.useState("");
    const [today,setToday] = React.useState(new Date().toLocaleDateString());
    const [checkInTime, setCheckIn] = React.useState("00:00:00");
    const [checkOutTime, setCheckOut] = React.useState("00:00:00");
    const [workname, setWorkname] = React.useState("");
    const navi = useNavigate();
    const handleCheckIn = async () => {
        //axios해서 res로 정상 출근인정되면 setworiking으로 버튼 활성화 되도록.
        setWorkstate("출근");
        const now = new Date().toLocaleTimeString('en-US',{hour12:false});
        const nowdate = new Date().toLocaleDateString('ko-KR',{hour12:false});
        setCheckIn(now);

        const checkInData = new FormData();
        checkInData.append("id",loginID);
        checkInData.append("date",nowdate);
        checkInData.append("time",now);
        
        await axios.post("/api/dash/checkin",checkInData).then(res =>{
            console.log(res.data);
            setWorking(true);
        });
    }

    const handleCheckOut = async () => {
        //axios해서 res로 정상 퇴근인정되면 setworiking으로 버튼 비활성화 되도록.
        const checkOutData = new FormData();
        const now = new Date().toLocaleTimeString('en-US',{hour12:false});
        const nowdate = new Date().toLocaleDateString('ko-KR',{hour12:false});

        setWorkstate("퇴근");
        setCheckOut(now);
        
        checkOutData.append("id",loginID);
        checkOutData.append("date",nowdate);
        checkOutData.append("time",now);

        await axios.put("/api/dash/checkout",checkOutData).then(res =>{
            console.log(res.data);
            setWorking(false);
            setWorkname("");
        });
    }

    const handleWorkName = (e) => {
        const workname = e.target.textContent;
        setWorkname("- "+workname);
    }

    React.useEffect(()=>{
        {loginID ? axios.get(`/api/dash/workstart/${loginID}`).then(res=>{
            console.log(res.data);
            if(res.data){
                setWorking(true);
                const starttime = res.data.workstart ? format(new Date(res.data.workstart), 'HH:mm:ss') : res.data.workstart;
                setCheckIn(starttime);
                setWorkstate("출근");
                if(res.data.workend){
                    const endtime = res.data.workend ? format(new Date(res.data.workend), 'HH:mm:ss') : res.data.workend;
                    console.log("퇴근했는데 왜 또 로그인해");
                    setCheckOut(endtime);
                    setWorkstate("퇴근");
                }
            }else{
                setWorking(false);
            }
        }).catch((e)=>{
            console.log(e);
            setWorking(false);
        }) : navi("/");}
    },[]);
    
    return(
        <div className={style.worksection}>
            <div className={`${style.padding15} ${style.height20}`}>
                <div className={`${style.left50}`}>
                    근무체크
                </div>
                <div className={`${style.right50}`}>
                    {checkOutTime != "00:00:00" ? "퇴근" : `${workState} ${workname}`}
                </div>
            </div>
            <div className={style.workContents}>
                <div className={style.padding10}>
                    <div className={style.dateDiv}>
                        <div className={`${style.today_date} ${style.left50}`} id='today_date'>
                            {today}
                        </div>
                        <div className={`${style.clock} ${style.right50}`} id='clock'>
                            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Grid container rowSpacing={2}>
                            <Grid xs={6} className={style.center}>
                                <IconButton aria-label="login" size="large" disabled={checkOutTime != "00:00:00" ? true : working} onClick={handleCheckIn}>
                                    <LoginIcon>
                                    </LoginIcon>    
                                </IconButton>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <IconButton aria-label="login" size="large" disabled={checkOutTime != "00:00:00" ? true : !working} onClick={handleCheckOut}>
                                    <LogoutIcon/>
                                    
                                </IconButton>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <div>
                                    출근하기
                                </div>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <div>
                                    퇴근하기
                                </div>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <div>
                                    {checkInTime}
                                </div>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <div>
                                    {checkOutTime}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid className={`${style.center} ${style.paddingtop15}`}>
                            <ButtonGroup aria-label="outlined button group" disabled={!working}>
                                <Button onClick={handleWorkName}>업무</Button>
                                <Button onClick={handleWorkName}>외출</Button>
                                <Button onClick={handleWorkName}>회의</Button>
                                <Button onClick={handleWorkName}>외근</Button>
                            </ButtonGroup>                    
                        </Grid>
                        
                    </div>
                </div>
            </div>  
        </div>
    )
}

const Signsection = () => {
    const navi = useNavigate();

    const handleSignButton = (e) => {
        const {name} = e.target;
        navi(`/Groovy/signlist/${name}`);
        
    }
    return (
        <div className={style.signsection}>
            <div className={`${style.padding10}`}>
                전자결재
            </div>
            <div className={`${style.signContents} ${style.center}`}>
                <Box sx={{ '& button': { m: 1 } }}>
                    <div className={`${style.signBtns}`}>
                        
                            <Button variant="outlined" name="wait" size="medium" onClick={handleSignButton}>
                                대기
                            </Button>
                        
                        
                            <Button variant="outlined" name="" size="medium" onClick={handleSignButton}>
                                확인
                            </Button>
                        

                    </div>
                    <div className={`${style.signBtns}`}>
                        
                            <Button variant="outlined" name="progress" size="medium" onClick={handleSignButton}>
                                진행
                            </Button>
                        
                        
                            <Button variant="outlined" name="complete" size="medium" onClick={handleSignButton}>
                                완료
                            </Button>
                        
                    </div>
                </Box>
            </div>
        </div>
    )
}


const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CalendarInfo = ({calendarData,pickedDate}) => {
    const isThereAnySchedule = calendarData.filter(e=> format(new Date(e.starttime), 'yyyy-MM-dd') == format(new Date(pickedDate), 'yyyy-MM-dd'));
    return isThereAnySchedule.length > 0 ? (
        <div>
            {
                isThereAnySchedule.map((e,i)=>{
                    return(
                        <div>
                            <div>
                                Title : {e.title}
                            </div>
                            <div>
                                Contents : {e.contents}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    ): (
        <div>
            일정 없음
        </div>
    )
}

const Calandarsection = () => {
    const {loginID} = React.useContext(LoginContext);
    const HighlightedDay = styled(PickersDay)(({ theme }) => ({
        "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        },
    }));
    
      //higlight the dates in highlightedDays arra
    const ServerDay = (props) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    
        const isSelected =
        !props.outsideCurrentMonth &&
        highlightedDays.includes(day.format("YYYY-MM-DD"));

        return (
            <HighlightedDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            selected={isSelected}
            />
            );
        };

    const [highlightedDays, setHighlitedDays] = React.useState([]);
    const [calendarData,setCalendarData] = React.useState([]);
    const [pickedDate,setPickedDate] = React.useState("");
    React.useEffect(()=>{
        axios.get(`/api/dash/calendar/${loginID}`).then(res=>{
                setCalendarData(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);
    React.useEffect(()=>{
        const tempArray = [];
        if(calendarData.length>0){
            calendarData.map((e,i)=>{
                tempArray.push(format(new Date(e.starttime), 'yyyy-MM-dd'));
            });
        }
        setHighlitedDays(prev=>[...prev,...tempArray]);
    },[calendarData]);

    
    const handleDate = (e) => {
        const pick = format(new Date(e.$d), 'yyyy-MM-dd')
        setPickedDate(e.$d);
        handleOpen();
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={style.calandarsection}>
            <div className={`${style.CalendarMain}`}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar onChange={handleDate}
                        sx={{
                            '& .MuiDayCalendar-weekContainer': {
                              height:36
                            }
                          }}
                        slots={{
                            day : ServerDay,
                        }}
                        slotProps={{
                            day:{
                                highlightedDays,
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={Modalstyle}>
                    <CalendarInfo  calendarData={calendarData} pickedDate={pickedDate}/>
                </Box>
            </Modal>
        </div>
    )
}

const ProjectSection = () => {
    const {loginID} = React.useContext(LoginContext);
    const {project,setProject,isLoading,setLoading} = React.useContext(ProjectContext);
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const COUNT_PER_PAGE = 3;
    const totalItems = project.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleSignList = project.slice(startIndex, endIndex);
    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    
    return (
        <div className={style.projectsection}>
            <div className={`${style.padding10} ${style.borderbtm}`}>
                <Grid container spacing={2}>
                    <Grid item xs={11} className={`${style.vcenter}`}>
                        프로젝트
                    </Grid>
                    <Grid item xs={1}>
                        <Link to='project'>
                        <IconButton aria-label="add">
                            <AddIcon fontSize='small'/>
                        </IconButton></Link>
                    </Grid>
                </Grid>
            </div>
            <div className={`${style.marginT30} ${style.padding10}`}>
                <Grid container rowSpacing={2}>
                    <Grid xs={1} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            번호
                        </Typography>
                    </Grid>
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        관리자
                        </Typography>
                    </Grid>
                    <Grid xs={5} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        프로젝트
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        기한
                        </Typography>
                    </Grid>
                    <Grid xs={1} className={style.center}>
                        
                    </Grid>
                </Grid>
            </div>
            <div>
                    {visibleSignList.map((e,i)=>{
                        return(          
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <Link to={`/groovy/dashboard/project/content/${e.pseq}`}><ListItem button>
                                    <Grid container key={i} className={`${style.marginT10}`}> 
                                        <Grid xs={1} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pseq}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.pmanager}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={5} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pname}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.ptime_limit ? format(new Date(e.ptime_limit), 'yyyy-MM-dd') : e.ptime_limit}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={1} className={style.center}>
                                            
                                        </Grid>
                                    </Grid>            
                                </ListItem></Link>
                            <Divider />
                                
                            </List>
                        )
                    })}
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={onPageChange}
                        size="medium"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "15px 0",
                        }}
                        renderItem={(item) => (
                            <PaginationItem {...item} sx={{ fontSize: 12 }} />
                        )}
                    />
                
            </div>
        </div>
    )
}

const NoticeSection = () => {
    return (
        <div className={style.noticesection}>
            <div className={`${style.padding10} ${style.borderbtm}`}>
                <Grid container spacing={2}>
                    <Grid item xs={11} className={`${style.vcenter}`}>
                        부서 내 소식
                    </Grid>
                    <Grid item xs={1}>
                    <Link to='notice'>
                        <IconButton aria-label="add">
                            <AddIcon fontSize='small'/>
                        </IconButton></Link>
                    </Grid>
                </Grid>
            </div>
            <div>
                
            </div>
        </div>
    )
}

const DashPageOne = () => {
    return(
        <div className={style.guideDiv}>
            <div className={style.left}>
                <Worksection/>
                <Signsection/>
                <Calandarsection/>
            </div>
            <div className={style.right}>
                <ProjectSection/>
                <NoticeSection/>
            </div>
        </div>
    )
}

export const ProjectContext = React.createContext();

const DashBoard=()=>{

    const CircularIndeterminate = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    };

    const [project,setProject] = React.useState([{}]);
    const [isLoading, setLoading] = React.useState(true);
    const {loginID} = React.useContext(LoginContext);

    React.useEffect(()=>{
        console.log(loginID);
        axios.get(`/api/project/${loginID}`).then(res=>{
            setProject(res.data);
            setLoading(false);
        }).catch((e)=>{
            console.log(e);
        });
    },[loginID]);

    if(isLoading){
        //return loginID ? (<CircularIndeterminate/>) : (<div>ID None</div>);
        return (<CircularIndeterminate/>);
    }

    return(
        <ProjectContext.Provider value={{project,setProject}}>
            <Routes>
                <Route path='/' element={<DashPageOne/>}></Route>
                    <Route path='project/*' element={<ProjectList/>}></Route>
                <Route path='notice/*' element={<DeptNotice/>}></Route>
            </Routes>        
        </ProjectContext.Provider>
    )
}

export default DashBoard;