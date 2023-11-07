import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import style from './project.module.css';
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Piechart from './Piechart.js'


const ProjectProgress = () => {
    return (
        <div className={`${style.progsection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                진행상황
            </div>
            <div>
                <Piechart/>
            </div>
        </div>
    )
}

const ProjectTodo = ({todo,setTodo}) => {
    return(
        <div className={`${style.todosection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                일정
            </div>
            <table border="1" className={`${style.list}`}>
                <thead>
                    <tr>
                        <th>시작일</th>
                        <th>종료일</th>
                        <th>할일</th>
                        <th>중요도</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((e,i)=>{
                        return(
                            <tr key={i}>
                                <td>{e.pschedule_start}</td>
                                <td>{e.pschedule_end}</td>
                                <td>{e.pschedule_contents}</td>
                                <td>{e.pschedule_importance}</td>
                                <td>{e.pschedule_state}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const ProjectMember = ({member,setMember}) => {
    return(
        <div className={`${style.membersection}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                프로젝트 멤버
            </div>
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
    console.log("asdasd");
    return(
        <div className={`${style.padding40} ${style.contentDiv}`}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <progressContext.Provider value={{progress,setProgress}}>
                    <ProjectProgress/>
                </progressContext.Provider>
            </Grid>

            <Grid item xs={12}>
                <ProjectTodo todo={todo} setTodo={setTodo}/>
            </Grid>

            <Grid item xs={12}>
                <ProjectMember member={member} setMember={setMember}/>
            </Grid>
        </Grid>
        </div>
    )
}

export default ProjectContent;