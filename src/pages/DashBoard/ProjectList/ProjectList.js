import { Link, Route, Routes } from "react-router-dom"
import ProjectContent from './ProjectContent.js'
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import style from './project.module.css'
import { ProjectContext } from "../DashBoard.js";

const ProjectList = () => {
    const {project,setProject} = useContext(ProjectContext);
    return(
        <div>
            <table border="1" className={`${style.list}`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>관리자</th>
                        <th>프로젝트 이름</th>
                        <th>기한</th>
                    </tr>
                </thead>
                <tbody>
                    {project.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.pseq}</td>
                                <td>{e.pmanager}</td>
                                <td><Link to={`/groovy/dashboard/project/content/${e.pseq}`}>{e.pname}</Link></td>
                                <td>{e.ptime_limit}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const ProjectState = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectList/>}></Route>
            <Route path="content/:seq" element={<ProjectContent/>}></Route>
        </Routes>
    )
}

export default ProjectState;