import style from './survey.module.css';
import {Divider, Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link, Route, Routes } from 'react-router-dom';
import SurveyWrite from './SurveyWrite/SurveyWrite';
import SurveyContent from './SurveyContent/SurveyContent';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
},
}));

const SurveyList = () => {
    const [survey,setSurvey] = useState([]);
    useEffect(()=>{
        axios.get("/api/survey/list").then(res=>{
            setSurvey(res.data);
        });
    },[]);

    return(
        <div className={`${style.surveyContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={8} className={`${style.vcenter}`}>
                        <Typography variant="h5" >
                            설문조사
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item xs={1} className={`${style.vcenter}`}>
                        <Link to="survey_write"><button>설문생성</button></Link>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div className={`${style.marginT50}`}>
                <Grid container rowSpacing={2}>
                    <Grid xs={1} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            번호
                        </Typography>
                    </Grid>
                    <Grid xs={6} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            제목
                        </Typography>
                    </Grid>
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            작성일자
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            상태
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div id='list'>
                {survey.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <Link to={`/Groovy/survey/survey_content/${e.surseq}`}>
                                    <ListItem button>
                                    <Grid container key={i}> 
                                        <Grid xs={1} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.surseq}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={5} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                                {e.surtitle}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.surwriter}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={2} className={style.center}>
                                            {e.surstate}
                                        </Grid>
                                    </Grid>            
                                </ListItem></Link>
                            <Divider />
                                
                            </List>
                        )
                    })}
            </div>
        </div>
    )
}

const Survey=()=>{
    return(
        <Routes>
            <Route path='/' element={<SurveyList/>}></Route>
            <Route path='survey_write' element={<SurveyWrite/>}></Route>
            <Route path='survey_content/:seq' element={<SurveyContent/>}></Route>
        </Routes>
    )
}

export default Survey;