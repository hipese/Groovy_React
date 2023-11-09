import { Button, Divider, Grid, Stack, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import style from './survey_write.module.css'
import { useState } from 'react';
const SurveyContent = () => {
    return(
        <div className={`${style.writeSection}`}>
            <Grid container spacing={2} sx={{
                padding:1
            }}>
                <Grid item xs={2} className={`${style.center}`}>
                    제목 : 
                </Grid>
                <Grid item xs={10}>
                    <TextField id="outlined-basic" label="제목" variant="outlined" sx={{width:"80%"}}/>
                </Grid>
            </Grid>
            <Divider sx={{bgcolor:"black"}}/>
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
                        />
                </Grid>
            </Grid>
            <Divider sx={{bgcolor:"black"}}/>
            
        </div>

    )
}

const ShortAnswer = () => {
    return(
        <div className={`${style.border} ${style.center} ${style.marginT20}`}>
            단답형 질문 : <input type="text" placeholder='단답형 질문을 입력하시오.' name='short_answer'/>
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
const MultipleChoice = () => {
    const [newQuestion, setNewQuestions] = useState([]);
    const NewQuestion = () => {
        return(
            <div className={`${style.padding10}`}>
                <input type="text" name={newQuestion.length}/>

            </div>
        )
    }
    const addQuestion = () => {
        if(newQuestion.length>4){
            alert("질문은 5개 이상 작성할 수 없습니다.");
        }else{
            const newQs = <NewQuestion key={newQuestion.length} />;
            setNewQuestions([...newQuestion, newQs]);
        }
        
        
    };
    return(
        <div className={`${style.border} ${style.center} ${style.marginT20}`}>
            객관식 질문 <button onClick={addQuestion}>객관식 세부 질문 추가</button>
            {newQuestion}
        </div>
    )
}



const SurveyQuestion = () => {
    const [questions, setQuestions] = useState([]);

    const addOpenEndedQuestion = () => {
        const newQuestion = <ShortAnswer key={questions.length} />;
        setQuestions([...questions, newQuestion]);
    };

    const addMultipleChoiceQuestion = () => {
        const newQuestion = <MultipleChoice key={questions.length} />;
        setQuestions([...questions, newQuestion]);
    };

    return(
        <div className={`${style.writeSection}`}>
            <button onClick={addOpenEndedQuestion}>주관식 질문 추가</button>
            <button onClick={addMultipleChoiceQuestion}>객관식 질문 추가</button>
            {questions}
            <Divider sx={{bgcolor:"black"}}/>
            
        </div>

    )
}

const SurveySubmit = () => {
    return(
        <div className={`${style.padding15} ${style.center}`}>
            <Stack direction="row" spacing={5}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    취소
                </Button>
                <Button variant="contained" endIcon={<SendIcon />}>
                    생성
                </Button>
            </Stack>
        </div>
    )
}

const SurveyWrite = () => {
    return(
        <div className={`${style.padding40} ${style.contentDiv}`}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <SurveyContent/>
                </Grid>
                <Grid item xs={12}>
                    <SurveyQuestion/>
                </Grid>
            </Grid>
        </div>
    )
}
export default SurveyWrite;