import { Link, Route, Routes } from "react-router-dom"
import ProjectContent from './ProjectContent.js'
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import style from './project.module.css'
import { ProjectContext } from "../DashBoard.js";
import { Divider, Grid, List, ListItem, Pagination, PaginationItem, Typography, alpha } from "@mui/material";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ProjectCreate from "./ProjectCreate.js";
import { format } from "date-fns";
import { LoginContext } from "../../../App.js";

const ProjectList = () => {
    const [project,setProject] = useState([{}]);
    const {loginID} = useContext(LoginContext);
    const [currentPage, setCurrentPage] = useState(1);
    const COUNT_PER_PAGE = 10;

    const totalItems = project.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleSignList = project.slice(startIndex, endIndex);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    useEffect(()=>{
        
        axios.get(`/api/project/${loginID}`).then(res=>{
            setProject(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);

    return(
        <div className={`${style.projectListContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item={true} xs={12} className={`${style.vcenter}`}>
                        <Typography variant="h5">
                            프로젝트
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            
            <div className={`${style.marginT20}`}>
            <Divider sx={{bgcolor:"black"}}/>
                <Grid container rowSpacing={2} className={`${style.padding20}`}>
                    <Grid item={true} xs={1} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            번호
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={3} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        관리자
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={6} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        프로젝트
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                        기한
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.list} ${style.padding20}`}>
                {visibleSignList.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders" key={i}>
                                <Link to={`/groovy/dashboard/project/content/${e.pseq}`}><ListItem button>
                                    <Grid container > 
                                        <Grid item={true} xs={1} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pseq}
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.pmanager}
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={6} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.pname}
                                            </Typography>
                                        </Grid>
                                        <Grid item={true} xs={2} className={style.center}>
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
                <div>
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