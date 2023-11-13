import { Divider, Grid, Typography } from '@mui/material';
import style from './survey_content.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { LoginContext } from '../../../App';

const SurveyTitle = () => {
    const {contextData} = useContext(SurveyContext);
    const titleData = contextData ? contextData[0] : {title:"",writer:"",contents:""};
    console.log(titleData);
    return(
        <div className={`${style.contentDiv} ${style.border} ${style.borderRad10}`}>

            <div className={`${style.borderbtm} ${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={1} className={`${style.center}`}>
                        
                    </Grid>
                    <Grid item xs={8} className={`${style.center}`}>
                        <Typography sx={{fontWeight:"bold"}}>
                            {titleData.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} className={`${style.center}`}>
                        {`작성자 : ${titleData.writer}`}
                    </Grid>
                </Grid>
                    
                </div>
                <div className={`${style.padding40}`}>
                    {titleData.contents}
                </div>
        </div>
    )
}

const SurveyQuestion = () => {
    const {seq} = useParams();
    const {contextData} = useContext(SurveyContext);
    const {loginID} = useContext(LoginContext);
    const questionData = contextData ? contextData.slice(1) : [{}];
    const [response,setResponse] = useState([]);

    const navi = useNavigate();

    const handleShortAnswer = (index, answer) => {
        const shortAnswerData = {type: 'short', question: questionData[index].short_seq, answer: answer, writer:loginID};

        setResponse(prev => {
            const newResult = [...(prev || [])];
            newResult[index] = shortAnswerData;
            return newResult;
        });
    };

    const handleMultiAnswer = (index, answer) => {
        const multiAnswerData = {type: 'multi',question: questionData[index].multi_seq,answer: answer, writer:loginID};

        setResponse(prev => {
            const newResult = [...(prev || [])];
            newResult[index] = multiAnswerData;
            return newResult;
        });
    };

    const show = () =>{
        console.log(response);
        axios.post(`/api/survey/response/${seq}`,response).then(res=>{
            navi("/Groovy/survey");
        });
    }

    return(
        <div className={`${style.contentDiv} ${style.border} ${style.borderRad10}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                <Typography sx={{fontWeight:"bold"}}>
                    질문
                </Typography>                
            </div>
            <div className={`${style.padding40}`}>
            {questionData.map((e, i) => (
                    <div key={i}>
                        <Typography>
                            {`${i+1} 번 질문`}
                        </Typography>
                        {e.type === 'short' && (
                            <div>
                                <div>
                                {e.questions}
                                </div>                                
                                <input type="text" name={`short_${i}`} onChange={(e)=>handleShortAnswer(i,e.target.value)}/>
                            </div>
                        )}
                        {e.type === 'multi' && (
                            <div>
                                {e.questions.map((data, j) => (
                                    <div key={j}>
                                        <input type="radio" name={`question_${i}`} value={data} onChange={(e)=> handleMultiAnswer(i,e.target.value)}/>
                                        <label>{data}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={show}>asd</button>
        </div>
    )
}

const SurveyContext = createContext();

const SurveyContent = () => {
    const {seq} = useParams();
    const [contextData,setContextData] = useState(undefined);

    const getData = async() => {
        const res = await axios.get(`/api/survey/content/${seq}`);
        setContextData(res.data);
    }
    useEffect(()=>{
        getData();
    },[]);
    return (
        <div className={`${style.padding40} ${style.contentDiv}`}>
            <SurveyContext.Provider value={{contextData,setContextData}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SurveyTitle/>
                    </Grid>

                    <Grid item xs={12}>
                        <SurveyQuestion/>
                    </Grid>
                </Grid>
            </SurveyContext.Provider>
        </div>
    )
}
export default SurveyContent;