import { Link, Route, Routes } from "react-router-dom"
import ProjectContent from './ProjectContent.js'
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import style from './project.module.css'
import { ProjectContext } from "../DashBoard.js";
import { Divider, Grid, List, ListItem, Typography, alpha } from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ProjectCreate from "./ProjectCreate.js";
import { format } from "date-fns";

const ProjectList = () => {
    const {project,setProject} = useContext(ProjectContext);
    console.log(project);
    return(
        <div className={`${style.projectListContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={`${style.vcenter}`}>
                        <Typography variant="h5" >
                            프로젝트
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div className={`${style.marginT40}`}>
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
                    <Grid xs={6} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        프로젝트
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        기한
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div id='list'>
                {project.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <Link to={`/groovy/dashboard/project/content/${e.pseq}`}><ListItem button>
                                    <Grid container key={i}> 
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
                                        <Grid xs={6} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pname}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.ptime_limit ? format(new Date(e.ptime_limit), 'yyyy-MM-dd') : e.ptime_limit}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem></Link>
                            <Divider />
                                
                            </List>
                        )
                    })}
                
            </div>
            
        </div>
        
    )
}

const ProjectState = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectList/>}></Route>
            <Route path="content/:seq" element={<ProjectContent/>}></Route>
            <Route path="create" element={<ProjectCreate/>}></Route>
        </Routes>
    )
}

export default ProjectState;