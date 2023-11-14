import { Divider, Grid, Typography } from '@mui/material';
import style from './survey_result.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { LoginContext } from '../../../App';
import { ResponsiveBar } from '@nivo/bar'
import Piechart from './Piechart';

const SurveyTitle = () => {
    const {contextData} = useContext(SurveyContext);
    const titleData = contextData ? contextData[0] : {title:"",writer:"",contents:""};
    
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

export const MultiChartContext = createContext();

const SurveyResult = () => {
    const {seq} = useParams() || 0;
    const {contextData} = useContext(SurveyContext);
    const questionData = contextData ? contextData.slice(1) : [{}];
    const [response,setResponse] = useState([]);

    const navi = useNavigate();

    const [data,setData] = useState([]);
    const [multiCount,setMultiCount] = useState([]);
    const [array,setArray] = useState([]);
    const [goUpate,setGoUpdate] = useState(0);
    
    const modifyMultiData = (ques) => {
        const filterData = data.filter(e => e.multi_seq === ques);
        const multiChartData = filterData.map(e => ({
            id: e.multi_res_contents,
            value: e.multi_count,
        }));
        return multiChartData;
    };

    const getData = async () => {
        const res = await axios.get(`/api/survey/result/${seq}`);
        setData(res.data);

        const number = [...new Set(res.data.map(e => e.multi_seq))];
        setMultiCount(number);
    };

    const updateArray = () => {
        if(multiCount.length > 0){
                multiCount.map((e,i)=>{
                setArray(prev=>[...prev,modifyMultiData(e)]);
            })
        }
    }    

    useEffect(() => {
        
        const fetchDataAndPopulateArray = async () => {
            await getData();
            setGoUpdate(goUpate+1);
        };
        fetchDataAndPopulateArray();
    }, [seq]); 

    useEffect(()=>{
        updateArray();
    },[goUpate]);

    const show = () =>{
        console.log(multiCount.length);
        console.log(data);
        console.log(array);
    }

    return(
        <div className={`${style.resultDiv} ${style.border} ${style.borderRad10}`}>
            <div className={`${style.borderbtm} ${style.padding10} ${style.center}`}>
                <Typography sx={{fontWeight:"bold"}}>
                    질문
                </Typography>                
            </div>
            <div className={`${style.padding40}`}>
                <button onClick={show}>asd</button>
                {array.map((e,i)=>{
                    return(
                        <Piechart array={e}/>
                    )
                })}
            </div>
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
                        <SurveyResult/>
                    </Grid>
                </Grid>
            </SurveyContext.Provider>
        </div>
    )
}
export default SurveyContent;