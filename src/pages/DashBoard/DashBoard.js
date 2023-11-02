import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import style from './DashBoard.module.css';
import { Grid } from '@mui/material';


const Worksection = () => {
    return(
        <div className={style.worksection}>
            <p>근무체크</p>
            <div className={style.contentsDiv}>
                a
            </div>  
        </div>
    )
}

const Signsection = () => {
    return (
        <div className={style.signsection}>
            <p>전자결재</p>
            <div className={style.contentsDiv}>
                a
            </div>
        </div>
    )
}

const Calandarsection = () => {
    return (
        <div className={style.calandarsection}>
            <p>달력</p>
            
        </div>
    )
}

const ProjectSection = () => {
    return (
        <div className={style.projectsection}>
            <p>프로젝트</p>
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
                <ProjectSection/>
            </div>
        </div>
        
        
    )
}

export default DashBoard;