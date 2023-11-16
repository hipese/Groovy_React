import style from './survey_result_list.module.css';
import {Divider, Grid, IconButton, List, ListItem, Pagination, PaginationItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../../App.js';

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

const SurveyResultList=()=>{
    const {loginID} = useContext(LoginContext);
    const [survey,setSurvey] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const COUNT_PER_PAGE = 10;

    const totalItems = survey.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleSignList = survey.slice(startIndex, endIndex);

    useEffect(()=>{
        axios.get(`/api/survey/resultList/${loginID}`).then(res=>{
            setSurvey(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    return(
        <div className={`${style.surveyContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={8} className={`${style.vcenter}`}>
                        <Typography variant="h5" >
                            설문조사 결과
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
                        
                    </Grid>
                </Grid>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.marginTB40}`}>
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
            <Divider sx={{bgcolor:"black"}}/>
            <div id='list' className={`${style.list}`}>
                {visibleSignList ? visibleSignList.map((e,i)=>{
                        return(
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                <Link to={`/Groovy/survey/survey_result/${e.surseq}`}>
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
                                            {e.surstate == 0 ? "설문진행중" : "설문종료"}
                                        </Grid>
                                    </Grid>            
                                </ListItem></Link>
                            <Divider />
                                
                            </List>
                        )
                    }) : "설문이 종료된 설문조사가 없습니다."}
            </div>
            <div>
            <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={onPageChange}
                    size="medium"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "15px 0",
                    }}
                    renderItem={(item) => (
                        <PaginationItem {...item} sx={{ fontSize: 12 }} />
                    )}
                />
            </div>
        </div>
    )
}

export default SurveyResultList;