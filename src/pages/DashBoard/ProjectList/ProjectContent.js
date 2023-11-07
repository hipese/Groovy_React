import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import style from './project.module.css';
import { useEffect, useState } from "react";
import axios from "axios";

const ProjectProgress = () => {
    return (
        <div className={`${style.progsection}`}>
            progress
        </div>
    )
}

const ProjectTodo = ({todo,setTodo}) => {
    return(
        <div className={`${style.todosection}`}>
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
            members
        </div>
    )
}


const ProjectContent = () => {
    const {seq} = useParams();
    const [todo,setTodo] = useState([{}]);
    const [member,setMember] = useState([{}]);
    useEffect(()=>{
        axios.get(`/api/project/todo/${seq}`).then(res=>{
            setTodo(res.data);
        }).catch(()=>{
            console.log("0");
        });
    },[]);
    console.log("asdasd");
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProjectProgress/>
            </Grid>

            <Grid item xs={12}>
                <ProjectTodo todo={todo} setTodo={setTodo}/>
            </Grid>

            <Grid item xs={12}>
                <ProjectMember member={member} setMember={setMember}/>
            </Grid>
        </Grid>
    )
}

export default ProjectContent;