import { Button, Divider, Grid, Stack, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import style from './survey_write.module.css'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../App';
const SurveyContent = ({survey,setSurvey}) => {
    //const [survey,setSurvey] = useState({title:"",contents:""});
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setSurvey(prev=>({...prev,[name]:value}));
    };
    return(
        <div className={`${style.writeSection}`}>
            <div className={`${style.borderbtm}`}>
                <Grid container spacing={2} sx={{
                    padding:1
                }}>
                    <Grid item xs={2} className={`${style.center}`}>
                        제목 : 
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="outlined-basic" label="제목" variant="outlined" sx={{width:"80%"}} name='surtitle' onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container spacing={2} sx={{
                    marginTop:1
                }}>
                    <Grid item xs={12} className={`${style.center}`}>
                        <TextField
                            id="outlined-multiline-static"
                            label="내용을 작성하세요"
                            multiline
                            rows={17}
                            sx={{
                                width:"90%",
                                height:450
                            }}
                            name='surcontents'
                            onChange={handleChange}
                            />
                    </Grid>
                </Grid>
            </div>            
        </div>

    )
}

const ShortAnswer = ({seq}) => {
    const {result,setResult,shrtAns,setShrtAns,shortAnswers,setShortAnswers} = useContext(QuestionContext);
    
    const handleChange = (e, seq) => {
        const {name,value} = e.target;

        const tempList = [...shortAnswers];  
        tempList[seq] = {...tempList[seq], type:"short",[name]:value};

        setShortAnswers(tempList);
        
    }
    
    const add = () => {
        if(shrtAns.short_answer != ""){
            setShortAnswers(prev=>[...prev,shrtAns]);
            //setResult(prev=>[...prev,shrtAns]);
        }    
    }


    return(
        <div className={`${style.center} ${style.marginT20}`}>
            단답형 질문 : <input type="text" data-key={`${seq}`} placeholder='단답형 질문을 입력하시오.' name="questions" onChange={(e)=> handleChange(e,seq)}/>
        </div>
        
    )
}

const LongAnswer = () => {
    return(
        <div>
            서술
        </div>
    )
}
const MultipleChoice = ({seq}) => {
    const [newQuestions, setNewQuestions] = useState(['']);
    const [multiContents,setMultiContents] = useState([]);
    
    const {result,setResult,formedAns, setFormedAns,multiAnswers,setMultiAnswers} = useContext(QuestionContext);

    const handleChange = (e, index) => {
        const { value } = e.target;
        setNewQuestions((prevQuestions) => {
            const newQuestionsArray = [...prevQuestions];
                newQuestionsArray[index] = value;
                return newQuestionsArray;
        });

    }

    const handleContentsChange = (e) => {
        const {name,value} = e.target;

        setMultiContents(prev=>({...prev,[name]:value}));
        
    }

    const addQuestion = () => {
    if (newQuestions.length > 4) {
        alert("질문은 5개 이상 작성할 수 없습니다.");
    } else {
        setNewQuestions((prevQuestions) => [...prevQuestions, '']);
    }
    };

    const show = () => {
        const tempList = [...multiAnswers];
        const tempContents = multiContents.contents;
        tempList[seq] = {type: "multi", questions:newQuestions, contents:tempContents};

        setMultiAnswers(tempList);
    }

    return (
    <div>
        <div className={`${style.center} ${style.marginT20}`}>
            <div className={`${style.center}`}>
                객관식 질문 : <input type="text" name='contents' placeholder='객관식 질문 입력' onChange={(e)=>handleContentsChange(e)}/> 
                <Button variant="outlined" size="medium" onClick={addQuestion}>
                    객관식 보기 추가
                </Button>
            </div> 
            <div>
                {newQuestions.map((question, index) => (
                    <div key={index} className={`${style.padding10}`}>
                    <input
                        type="text"
                        value={question}
                        placeholder={`${index+1}번 보기`}
                        onChange={(e) => handleChange(e, index)}
                        onBlur={show}
                    />
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}



const SurveyQuestion = () => {
    const {shortAnswers,multiAnswers} = useContext(QuestionContext);
    const [questions, setQuestions] = useState([]);

    const shrtansshow = () => {
        console.log(shortAnswers);
        console.log(multiAnswers);
    }

    const addOpenEndedQuestion = () => {
        const newQuestion = <ShortAnswer key={questions.length} seq={questions.length} />;
        //shrtAns={shrtAns} setShrtAns={setShrtAns}
        //setShortAnswers(prev=>[...prev,shrtAns]);
        setQuestions([...questions, newQuestion]);
    };

    const addMultipleChoiceQuestion = () => {
        const newQuestion = <MultipleChoice key={questions.length} seq={questions.length} />;
        //formedAns={formedAns} setFormedAns={setFormedAns}
        setQuestions([...questions, newQuestion]);
    };

    return(
        <div className={`${style.writeSection}`}>
            <div className={`${style.padding10} ${style.btnEven} ${style.borderbtm}`}>
                <Button variant="contained" size="medium" onClick={addOpenEndedQuestion}>
                    주관식 질문 추가
                </Button>
                <Button variant="contained" size="medium" onClick={addMultipleChoiceQuestion}>
                    객관식 질문 추가
                </Button>
            </div>
            {questions}
        </div>
    )
}

const QuestionContext = createContext();

const SurveyWrite = () => {
    const {loginID} = useContext(LoginContext);
    const [result,setResult] = useState([]);
    const [shrtAns,setShrtAns] = useState({type:"subjective",questions:""});
    const [formedAns, setFormedAns] = useState({ type: "multi", questions: [], contents : "" });
    const [survey,setSurvey] = useState({surtitle:"",surcontents:"",surwriter:loginID});

    const [shortAnswers,setShortAnswers] = useState([]); //주관식 질문들을 담는 state
    const [multiAnswers,setMultiAnswers] = useState([]); //객관식 질문들을 담는 state
    
    const navi = useNavigate();
    
    const handleAllData = async () => {
        if(survey.surtitle == "" || survey.surtitle == undefined){
            alert("제목을 작성하시오");
            return;
        }else if(survey.surcontents == "" || survey.surcontents == undefined){
            alert("내용을 작성하시오");
            return;
        }
        
        const updateResult = [survey,...shortAnswers.filter(Boolean),...multiAnswers.filter(Boolean)];
        console.log(updateResult);
        updateResult.forEach(obj => {
            if (Array.isArray(obj.questions) && obj.questions.length > 0) {
              obj.questions = obj.questions.filter(question => question !== '');
              if (obj.questions.length === 0) {
                obj.questions = null;
              }
            }
          });
          console.log(updateResult);
          const temp = updateResult.filter(e=>e.type !== 'multi' || (e.contents !== null && e.contents !== undefined && e.contents !== ""));

        await new Promise((res)=>{
            setResult(prev=>[...prev,...temp]);
            res();
        });
    }

    const sendData = async () => {
        console.log(result);
        try{
            await axios.post("/api/survey",result).then(res=>{
                navi("/Groovy/survey");
                console.log("post 성공");
            }).catch((e)=>{
                console.log("survey error : "+e);
            });
        }catch(e){

        }
    }

    useEffect(()=>{
        if(result.length>0){
            sendData();
        }
        setResult([]);
    },[result]);

    const resultInsert = async () => {
        await handleAllData();
    }

    return(
        <div className={`${style.padding40} ${style.contentDiv}`}>
            <QuestionContext.Provider value={{result,setResult,shrtAns,setShrtAns,formedAns, setFormedAns,shortAnswers,setShortAnswers,multiAnswers,setMultiAnswers}}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <SurveyContent survey={survey} setSurvey={setSurvey}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SurveyQuestion/>
                        <Stack direction="row" spacing={5} className={`${style.center} ${style.padding10}`}>
                            <Link to="/Groovy/survey"><Button variant="outlined" startIcon={<DeleteIcon />}>
                                취소
                            </Button></Link>
                            <Button variant="contained" endIcon={<SendIcon />}  onClick={resultInsert}>
                                생성
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </QuestionContext.Provider>
        </div>
    )
}
export default SurveyWrite;