import { Link, useNavigate } from "react-router-dom";
import style from "./Sign_Review.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, PaginationItem } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PendingIcon from '@mui/icons-material/Pending';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { red, blue } from '@mui/material/colors';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );
};

const Sign_Review = () => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [sign_list, setSign_list] = useState([]);
    const [loading, setLoading] = useState(true);
    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        axios.get("/api/signlist/Review").then((resp) => {
            setSign_list(resp.data);
            setLoading(false);
        });
    }, []);

    const totalItems = sign_list.length;
    const totalPages = Math.ceil(totalItems / COUNT_PER_PAGE);

    const onPageChange = (e, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    const endIndex = Math.min(startIndex + COUNT_PER_PAGE, totalItems);
    const visibleSignList = sign_list.slice(startIndex, endIndex);

    const handleSeniorReview = (seq) => {
        navigate(`/Groovy/signlist/Sign_SeniorReviewWrite/${seq}`);
    };


    if (loading) {
        // 데이터 로딩 중에는 로딩창을 표시
        return <CircularIndeterminate />;
    }

    return (
        <div className={style.sign_container}>
            <div className={style.header}>
                검토문서 
                <hr />
            </div>
            <div className={style.documents}>
                <div className={style.titleText}>검토문서</div>
                <div className={style.text}>{`완료된 문서가 ${sign_list.length}건이 있습니다.`}</div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: blue[200] }} >
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">문서번호</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">결제양식</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">제목</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안자</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">기안일</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">결재여부</TableCell>
                                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }} align="center">상위부서</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visibleSignList.map((e, i) => (
                                <TableRow className={style.hoverEffect}
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }
                                    }
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {e.seq}
                                    </TableCell>
                                    <TableCell align="center">{e.document_type}</TableCell>
                                    <TableCell align="center"><Link to={`/Groovy/signlist/detail/${e.seq}`}>{e.title}</Link></TableCell>
                                    <TableCell align="center">{e.writer}</TableCell>
                                    <TableCell align="center">{e.write_date}</TableCell>
                                    <TableCell align="center">{e.accept === 0 ? <DoneIcon style={{ color: 'green' }} /> : e.accept === 1 ? <PendingIcon style={{ color: blue[200] }} /> : e.accept === 2 ? <CloseIcon style={{ color: red[600] }} /> : <QuestionMarkIcon />}</TableCell>
                                    <TableCell align="center"><button onClick={() => handleSeniorReview(e.seq)} value={e.seq} className={style.reviewButton}>상위부서결재</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={style.pagenation}>
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
        </div>
    );
}
export default Sign_Review;