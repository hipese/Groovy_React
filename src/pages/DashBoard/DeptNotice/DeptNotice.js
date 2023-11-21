import style from './notice.module.css';
import {Divider, Grid, IconButton, List, ListItem, Pagination, PaginationItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoginContext } from '../../../App';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

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

const DeptNoticeList = () => {
    const {loginID} = useContext(LoginContext);
    const [isExcutives,setExcutives] = useState(false);
    const [deptNotice,setDeptNotice] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const COUNT_PER_PAGE = 10;
    
    useEffect( ()=>{
        axios.get(`/api/dept_notice/${loginID}`).then(res=>{
            const group = res.data;
            axios.get(`/api/boards/deptCom/${group}`).then(response=>{
                setDeptNotice(response.data);
            }).catch((e)=>{
                console.log("board - "+e);
            });
        }).catch((e)=>{
            console.log("group -"+e);
        });
    },[]);

    const totalItems = deptNotice.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleNoticeList = deptNotice.slice(startIndex, endIndex);

    const [search,setSearch] = useState("");

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };
    const handleSearchChange = (e) => {
        const {value} = e.target;
        setSearch(value);
    }

    return (
        <div className={`${style.noticeContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={9} className={`${style.vcenter}`}>
                        <Typography variant="h5" >
                            부서 내 소식
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
                            onChange={handleSearchChange}
                            />
                        </Search>
                    </Grid>
                </Grid>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.marginTB20}`}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={1} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            작성자
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            제목
                        </Typography>
                    </Grid>
                    <Grid item xs={3} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            조회수
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            작성일
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider sx={{bgcolor:"black"}}/>
            <div id='list'>                
                {search == "" ?
                visibleNoticeList.map((e,i)=>{
                        return(
                            <List sx={style} key={i} component="nav" aria-label="mailbox folders">            
                                <ListItem button>
                                    <Grid container className={`${style.marginT10}`}> 
                                        <Grid item xs={1} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.writer}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.view_count}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.write_date}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                            </List>           
                        )
                    }) :
                    deptNotice.filter((e)=>e.title.includes(search) || (e.writer.includes(search))).map((e,i)=>{
                        return(
                            <List sx={style} key={i} component="nav" aria-label="mailbox folders">            
                                <ListItem button>
                                    <Grid container className={`${style.marginT10}`}> 
                                        <Grid item xs={1} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.writer}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.view_count}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} className={style.center}>
                                            <Typography className={`${style.fs} ${style.b}`}>
                                            {e.write_date}
                                            </Typography>
                                        </Grid>
                                    </Grid>            
                                </ListItem>
                            </List>           
                        )
                    })}           
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

const DeptNotice = () => {
    return (
        <Routes>
            <Route path='/' element={<DeptNoticeList/>}></Route>
        </Routes>
    )
}
export default DeptNotice;