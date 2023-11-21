import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import style from './project.module.css'
import { useContext, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';
import { LoginContext } from '../../../App';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
    const {loginID} = useContext(LoginContext);
    const [newProject,setNewProject] = useState({pseq:0,pmanager:`${loginID}`,pname:"",pcontents:"",ptime_limit:""});
    const [selDate,setSelDate] = useState("");
    const navi = useNavigate();

    const handleDateChange = (e) => {        
        setSelDate(format(new Date(e.$d), 'yyyy-MM-dd'));
        setNewProject(prev=>({...prev,["ptime_limit"]:format(new Date(e.$d), 'yyyy-MM-dd')}));
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setNewProject(prev=>({...prev,[name]:value,pmanager:loginID}));
    }

    const handleProjectAdd = async () => {
        axios.post("/api/project/create",newProject).then(res=>{
            navi("/Groovy/dashboard/project");
        }).catch((e)=>{
            console.log(e);
        });        
    }
    return(
        <div className={`${style.projectCreateContents} ${style.border} ${style.borderRad10}`}>
            <div className={`${style.padding20}`}>
                <Typography sx={{
                        fontSize : 25
                    }}>
                        프로젝트 생성
                </Typography>
            </div>
            <Divider sx={{
                    borderColor : "black"
                }}/>
            <div className={`${style.padding20}`}>
                <Typography sx={{
                        fontSize : 18
                    }}>
                        프로젝트 이름
                </Typography>
                <TextField id="outlined-basic" label="프로젝트 이름" variant="outlined" fullWidth sx={{width:700}} name='pname' onChange={handleChange}/>
            </div>
            <Divider sx={{
                    borderColor : "black"
                }}/>
            <div className={`${style.padding20}`}>
                <Typography sx={{
                        fontSize : 18
                    }}>
                        프로젝트 설명
                </Typography>
                <TextField id="outlined-multiline-static" label="프로젝트 설명" variant="outlined" name='pcontents' multiline rows={4} sx={{width:700}} onChange={handleChange}/>
            </div>
            <Divider sx={{
                    borderColor : "black"
                }}/>
            <div className={`${style.padding20}`}>
                <Typography sx={{
                        fontSize : 18
                    }}>
                        기한
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="기한"
                            onChange={handleDateChange}
                        />
                </LocalizationProvider>
            </div>
            <Divider sx={{
                    borderColor : "black"
                }}/>
            <div className={`${style.center} ${style.padding10}`}>
                <Stack direction="row" spacing={5}>
                    <Link to="/Groovy/dashboard"><Button variant="outlined" startIcon={<DeleteIcon />}>
                        취소
                    </Button></Link>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleProjectAdd}>
                        생성
                    </Button>
                </Stack>
            </div>
             
        </div>
    )
}

export default ProjectCreate;