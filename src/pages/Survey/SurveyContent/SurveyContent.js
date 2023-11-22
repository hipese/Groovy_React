import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import style from './survey_content.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { LoginContext } from '../../../App';
import SendIcon from '@mui/icons-material/Send';
import { SurveyContext } from '../Survey';
import { Login } from '@mui/icons-material';

const SurveyTitle = () => {
    const {contextData} = useContext(SurveyContentsContext);
    const {seq} = useParams();
    const {loginID} = useContext(LoginContext);
    const titleData = contextData ? contextData[0] : {title:"",writer:"",contents:""};

    const navi = useNavigate();

    const handleSurveyClose = () => {
        axios.put(`/api/survey/close/${seq}`).then(res=>{
            navi("/Groovy/survey");
        }).catch((e)=>{
            console.log(e);
            navi("/Groovy/survey");
        });
    }

    return(
        <div className={`${style.contentDiv} ${style.border} ${style.borderRad10}`}>

            <div className={`${style.borderbtm} ${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={2} className={`${style.center}`}>
                    {loginID == titleData.writer ? <Button variant="outlined" size='small' onClick={handleSurveyClose}>설문종료</Button> : ""}
                    </Grid>
                    <Grid item xs={7} className={`${style.center}`}>
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
    const {contextData} = useContext(SurveyContentsContext);
    const titleData = contextData ? contextData[0] : {title:"",writer:"",contents:""};
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
        }).catch((e)=>{
            console.log(e);
            navi("/Groovy/survey");
        });
    }

    const deleteContents = () => {
        axios.delete(`/api/survey/delete/${seq}`).then(res=>{
            navi("/Groovy/survey");
        }).catch((e)=>{
            console.log(e);
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
            <div className={`${style.padding40} ${style.borderbtm}`}>
            {questionData.map((e, i) => (
                    <div key={i}>
                        <Typography sx={{fontSize:"18",fontWeight:"bold"}}>
                            {/* {`${i+1} 번 질문 ${e.multi_contents}`} */}
                            {
                                e.multi_contents != undefined ? (i+1)+"번 질문 : "+e.multi_contents : (i+1)+"번 질문"
                            }
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
            <div className={`${style.center} ${style.padding10} ${style.btnEven}`}>
                <Link to="/Groovy/survey"><Button variant="outlined">
                    뒤로가기
                </Button></Link>
                {
                    loginID == titleData.writer ? <Button variant="outlined" color="error" onClick={deleteContents}>삭제하기</Button> : ""
                }
                <Button variant="contained" onClick={show}  endIcon={<SendIcon />}>
                    제출
                </Button>
            </div>            
        </div>
    )
}

const SurveyContentsContext = createContext();

const SurveyContent = () => {

    const CircularIndeterminate = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    };

    const {seq} = useParams();
    const {loginID} = useContext(LoginContext);
    const [contextData,setContextData] = useState(undefined);
    const [isLoading,setLoading] = useState(true);
    const navi = useNavigate();

    const getData = async() => {
        const res = await axios.get(`/api/survey/content/${seq}`).finally(()=>{
            setLoading(false);
        });
        setContextData(res.data);
    }
    useEffect(()=>{
        getData();
        axios.get(`/api/survey/getRes/${seq}/${loginID}`).then(res=>{
            if(res.data){
                alert("이미 참여한 설문조사입니다.");
                navi(-1);
            }
        }).catch((e)=>{
            console.log(e);
        });
    },[]);

    if(isLoading){
        return(<CircularIndeterminate/>)
    }
    return (
        <div className={`${style.padding40} ${style.contentDiv}`}>
            <SurveyContentsContext.Provider value={{contextData,setContextData}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SurveyTitle/>
                    </Grid>

                    <Grid item xs={12}>
                        <SurveyQuestion/>
                    </Grid>
                </Grid>
            </SurveyContentsContext.Provider>
        </div>
    )
}
export default SurveyContent;