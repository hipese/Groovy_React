import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import style from './DashBoard.module.css';
import { Button, ButtonGroup, Grid, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';


const Worksection = () => {
    return(
        <div className={style.worksection}>
            <div className={`${style.padding15} ${style.height20}`}>
                <div className={`${style.left50}`}>
                    근무체크
                </div>
                <div className={`${style.right50}`}>
                    근무상태
                </div>
            </div>
            <div className={style.workContents}>
                <div className={style.padding10}>
                    <div className={style.dateDiv}>
                        <div className={`${style.today_date} ${style.left50}`} id='today_date'>
                                11월 3일
                        </div>
                        <div className={`${style.clock} ${style.right50}`} id='clock'>
                            09:12
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Grid container rowSpacing={2}>
                            <Grid xs={6} className={style.center}>
                                <IconButton aria-label="login" size="large">
                                    <LoginIcon>
                                    </LoginIcon>    
                                </IconButton>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <IconButton aria-label="login" size="large">
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
                                    00:00:00
                                </div>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <div>
                                    00:00:00
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid className={`${style.center} ${style.paddingtop15}`}>
                            <ButtonGroup aria-label="outlined button group">
                                <Button>업무</Button>
                                <Button>외출</Button>
                                <Button>회의</Button>
                                <Button>외근</Button>
                            </ButtonGroup>                    
                        </Grid>
                        
                    </div>
                </div>
            </div>  
        </div>
    )
}

const Signsection = () => {
    return (
        <div className={style.signsection}>
            <div className={`${style.padding10}`}>
                전자결재
            </div>
            <div className={`${style.signContents} ${style.center}`}>
                <Box sx={{ '& button': { m: 1 } }}>
                    <div className={`${style.signBtns}`}>
                        <Button variant="outlined" size="medium">
                            대기
                        </Button>
                        <Button variant="outlined" size="medium">
                            확인
                        </Button>
                    </div>
                    <div className={`${style.signBtns}`}>
                        <Button variant="outlined" size="medium">
                        예정
                        </Button>
                        <Button variant="outlined" size="medium">
                        진행
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

const Calandarsection = () => {
    return (
        <div className={style.calandarsection}>
            <div className={style.padding15}>
                일정(달력 들어와야함)
            </div>
            
        </div>
    )
}

const ProjectSection = () => {
    return (
        <div className={style.projectsection}>
            <div className={`${style.padding10} ${style.borderbtm}`}>
                <Grid container spacing={2}>
                    <Grid item xs={11} className={`${style.vcenter}`}>
                        프로젝트
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="add">
                            <AddIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <div>

            </div>

        </div>
    )
}

const NoticeSection = () => {
    return (
        <div className={style.projectsection}>
            <div className={`${style.padding10} ${style.borderbtm}`}>
                <Grid container spacing={2}>
                    <Grid item xs={11} className={`${style.vcenter}`}>
                        부서 내 소식
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton aria-label="add">
                            <AddIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <div>
                
            </div>
        </div>
    )
}

const DashBoard=()=>{
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

export default DashBoard;